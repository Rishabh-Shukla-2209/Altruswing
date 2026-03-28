"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { logNewScore } from "@/app/(subscriber)/dashboard/action";

export function ScoreEntry() {
  const [score, setScore] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async () => {
    const scoreValue = parseInt(score, 10);

    if (isNaN(scoreValue) || scoreValue < 1 || scoreValue > 45) {
      setFeedback({ type: "error", message: "Please enter a valid score (1-45)." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Call the Server Action
      await logNewScore(scoreValue);

      // Handle Success
      setScore("");
      setFeedback({ type: "success", message: "Score logged successfully!" });

      setTimeout(() => {
        setFeedback(null);
      }, 3000);

    } catch (error: unknown) {
      console.error("Error logging score:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to log score.";
      setFeedback({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
        <div className="flex-1 w-full relative">
          <label className="block text-xs uppercase tracking-[0.2em] font-label text-on-surface-variant mb-3 px-2">
            Log New Stableford Score (1-45)
          </label>
          <Input
            type="number"
            min={1}
            max={45}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Enter score..."
            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-6 h-14 text-xl font-headline focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-on-surface-variant/30 disabled:opacity-50"
          />

          {feedback && (
            <div className={`absolute -bottom-8 left-2 flex items-center gap-2 text-sm font-medium animate-in fade-in ${feedback.type === "success" ? "text-green-500" : "text-error"}`}>
              {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {feedback.message}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !score}
          className="h-14 px-10 w-full md:w-auto flex items-center justify-center cursor-pointer bg-gradient-to-br from-primary to-primary-container text-on-primary font-extrabold rounded-xl transition-all active:scale-95 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Score"}
        </button>
      </div>
    </div>
  );
}