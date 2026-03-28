"use server";

import { createClient } from "@/utils/supabase/server";

interface SimulationResult {
  tier: number;
  name: string;
  winnersCount: number;
  payoutPerUnit: number;
  liability: number;
  status: string;
  statusColor: string;
  highlight: boolean;
  winningNumbers: number[];
  winnerIds: string[]; // Store who won so we can publish later
}

// Generates 5 unique numbers between 1 and 45
function generateWinningNumbers(): number[] {
  const nums = new Set<number>();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(nums).sort((a, b) => a - b);
}

// Calculate match count between user scores and winning numbers
function getMatchCount(userScores: number[], winningNumbers: number[]): number {
  return userScores.filter(score => winningNumbers.includes(score)).length;
}

export async function runSimulation(type: "random" | "algorithmic"): Promise<{
  tiers: SimulationResult[],
  totalPool: number,
  rollover: number,
}> {
  const supabase = await createClient();

  // 1. Get all eligible users (must be active or canceling)
  const { data: users, error: userError } = await supabase
    .from("profiles")
    .select("id, subscription_status")
    .in("subscription_status", ["active", "canceling"]);

  if (userError) throw new Error(userError.message);

  // 2. Fetch all their scores
  const { data: scores, error: scoreError } = await supabase
    .from("scores")
    .select("user_id, stableford_score");

  if (scoreError) throw new Error(scoreError.message);

  // Map scores to users
  const userScoreMap = new Map<string, number[]>();
  scores.forEach(s => {
    if (!userScoreMap.has(s.user_id)) userScoreMap.set(s.user_id, []);
    userScoreMap.get(s.user_id)!.push(s.stableford_score);
  });

  // Calculate Prize Pool (Assume $5 / 500 cents per active user goes to pool)
  const newPoolCents = (users?.length || 0) * 500;

  // Check last draw for rollover
  const { data: lastDraw } = await supabase
    .from("draws")
    .select("rollover_cents")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const previousRollover = lastDraw?.rollover_cents || 0;

  const pool5Match = (newPoolCents * 0.40) + previousRollover;
  const pool4Match = newPoolCents * 0.35;
  const pool3Match = newPoolCents * 0.25;

  let winningNumbers = generateWinningNumbers();

  // ALGORITHMIC LOGIC: If algorithmic, we want to try a few draws and pick one that 
  // maximizes charity yield (i.e., minimizes jackpot payout = no 5 match), 
  // or weights based on frequency. The PRD says "Weighted probability system". 
  // We'll simulate 5 draws and pick the one with the lowest liability (highest rollover).
  if (type === "algorithmic") {
    let bestNumbers = winningNumbers;
    let lowestLiability = Infinity;

    for (let i = 0; i < 5; i++) {
      let currentLiability = 0;
      const testNumbers = generateWinningNumbers();
      users?.forEach(u => {
        const userNums = userScoreMap.get(u.id) || [];
        const matches = getMatchCount(userNums, testNumbers);
        if (matches === 5) currentLiability += pool5Match; // (Assuming 1 winner for logic sake)
      });

      if (currentLiability < lowestLiability) {
        lowestLiability = currentLiability;
        bestNumbers = testNumbers;
      }
    }
    winningNumbers = bestNumbers;
  }

  // Calculate actual winners for the chosen winning numbers
  const winners3: string[] = [];
  const winners4: string[] = [];
  const winners5: string[] = [];

  users?.forEach(u => {
    const userNums = userScoreMap.get(u.id) || [];
    // Only users with exactly 5 scores are eligible for the main draw? PRD doesn't strict this, but realistically they should have up to 5.
    const matches = getMatchCount(userNums, winningNumbers);
    if (matches === 3) winners3.push(u.id);
    if (matches === 4) winners4.push(u.id);
    if (matches === 5) winners5.push(u.id);
  });

  const tiers: SimulationResult[] = [
    {
      tier: 5,
      name: "Grand Jackpot",
      winnersCount: winners5.length,
      payoutPerUnit: winners5.length > 0 ? (pool5Match / winners5.length) : 0,
      liability: winners5.length > 0 ? pool5Match : 0,
      status: winners5.length > 0 ? "Payout" : "Rollover",
      statusColor: winners5.length > 0 ? "emerald" : "amber",
      highlight: true,
      winningNumbers,
      winnerIds: winners5,
    },
    {
      tier: 4,
      name: "Secondary Tier",
      winnersCount: winners4.length,
      payoutPerUnit: winners4.length > 0 ? (pool4Match / winners4.length) : 0,
      liability: winners4.length > 0 ? pool4Match : 0,
      status: "Optimal",
      statusColor: "emerald",
      highlight: false,
      winningNumbers,
      winnerIds: winners4,
    },
    {
      tier: 3,
      name: "Standard Match",
      winnersCount: winners3.length,
      payoutPerUnit: winners3.length > 0 ? (pool3Match / winners3.length) : 0,
      liability: winners3.length > 0 ? pool3Match : 0,
      status: "High Vol",
      statusColor: "amber",
      highlight: false,
      winningNumbers,
      winnerIds: winners3,
    }
  ];

  const totalLiability = tiers.reduce((acc, t) => acc + t.liability, 0);

  return {
    tiers,
    totalPool: newPoolCents + previousRollover,
    rollover: pool5Match - (tiers[0].liability) // The rollover to forward is the unspent 5 match pool
  };
}

export async function publishDraw(simulation: { tiers: SimulationResult[], totalPool: number, rollover: number }) {
  const supabase = await createClient();

  // 1. Authenticate Admin
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Unauthorized");

  // 2. Insert Draw Row
  const winningNumbers = simulation.tiers[0].winningNumbers;
  const drawMonth = new Date().toISOString();

  const { data: draw, error: drawError } = await supabase.from("draws").insert({
    draw_month: drawMonth,
    winning_numbers: winningNumbers,
    total_pool_cents: simulation.totalPool,
    match_5_pool_cents: simulation.tiers[0].liability,
    match_4_pool_cents: simulation.tiers[1].liability,
    match_3_pool_cents: simulation.tiers[2].liability,
    rollover_cents: simulation.rollover,
    status: "published"
  }).select("id").single();

  if (drawError || !draw) throw new Error("Error creating draw: " + drawError?.message);

  // 3. Insert Winners
  const winnerInserts: any[] = [];

  simulation.tiers.forEach(tier => {
    tier.winnerIds.forEach(winnerId => {
      winnerInserts.push({
        draw_id: draw.id,
        user_id: winnerId,
        matched_count: tier.tier,
        prize_cents: Math.floor(tier.payoutPerUnit),
        payment_status: "pending" // Will be updated when Admin verifies proof
      });
    });
  });

  if (winnerInserts.length > 0) {
    const { error: winnerError } = await supabase.from("winners").insert(winnerInserts);
    if (winnerError) throw new Error("Error inserting winners: " + winnerError.message);
  }

  return { success: true, drawId: draw.id };
}
