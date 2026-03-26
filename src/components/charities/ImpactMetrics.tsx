interface ImpactMetricsProps {
  percentage: number;
  amountRaised: string;
  patronCount: string;
  goalDescription: string;
}

export function ImpactMetrics({
  percentage,
  amountRaised,
  patronCount,
  goalDescription,
}: ImpactMetricsProps) {
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <section className="p-12 rounded-xl bg-surface-container-low relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-fixed blur-[120px] opacity-30 -z-10"></div>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-surface-variant"
              cx="96"
              cy="96"
              fill="transparent"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
            />
            <circle
              className="text-primary"
              cx="96"
              cy="96"
              fill="transparent"
              r="88"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="12"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-4xl font-headline font-extrabold text-primary">
              {percentage}%
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-label">
            Fundraising Milestone
          </h4>
          <div className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">
            {amountRaised}
          </div>
          <p className="text-on-surface-variant">
            Contributed by {patronCount} patrons this quarter. {goalDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
