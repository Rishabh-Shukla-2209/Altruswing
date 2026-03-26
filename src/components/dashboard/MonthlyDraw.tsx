export function MonthlyDraw() {
  return (
    <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-label text-on-surface-variant mb-1">
            Official Draw
          </p>
          <h3 className="text-2xl font-bold font-headline">Monthly Draw</h3>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-[10px] font-black font-label text-primary uppercase">
            Elite Tier
          </span>
        </div>
      </div>

      <div className="mb-10 text-center">
        <p className="text-xs font-label text-on-surface-variant uppercase mb-4">
          Countdown to Next Draw
        </p>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-black font-headline">04</div>
            <div className="text-[10px] font-label text-on-surface-variant uppercase">
              Days
            </div>
          </div>
          <div className="text-3xl font-black font-headline text-primary/40">
            :
          </div>
          <div className="text-center">
            <div className="text-3xl font-black font-headline">12</div>
            <div className="text-[10px] font-label text-on-surface-variant uppercase">
              Hrs
            </div>
          </div>
          <div className="text-3xl font-black font-headline text-primary/40">
            :
          </div>
          <div className="text-center">
            <div className="text-3xl font-black font-headline">45</div>
            <div className="text-[10px] font-label text-on-surface-variant uppercase">
              Min
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-xl text-center">
        <p className="text-xs font-label text-on-surface-variant uppercase mb-2">
          Lifetime Winnings
        </p>
        <div className="text-4xl font-extrabold font-headline text-primary">
          $1,250.00
        </div>
      </div>
    </div>
  );
}
