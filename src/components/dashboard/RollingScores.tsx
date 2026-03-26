interface Score {
  date: string;
  value: number;
  isLatest?: boolean;
}

interface RollingScoresProps {
  scores: Score[];
}

export function RollingScores({ scores }: RollingScoresProps) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-widest font-label text-on-surface-variant mb-6 ml-1">
        Rolling 5 Performance
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {scores.map((score, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl flex flex-col items-center transition-all ${
              score.isLatest
                ? "bg-surface-container-highest ring-2 ring-primary shadow-xl shadow-primary/10 -translate-y-2"
                : `bg-surface-container ${i === 0 ? "opacity-40" : ""}`
            }`}
          >
            <span
              className={`text-xs font-label uppercase mb-2 ${
                score.isLatest
                  ? "text-primary font-bold"
                  : "text-on-surface-variant"
              }`}
            >
              {score.isLatest ? "Latest" : score.date}
            </span>
            <span
              className={`font-black font-headline ${
                score.isLatest
                  ? "text-4xl text-primary"
                  : "text-3xl text-on-surface"
              }`}
            >
              {score.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
