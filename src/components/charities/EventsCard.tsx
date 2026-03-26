interface Event {
  title: string;
  location: string;
  date: string;
  time: string;
}

interface EventsCardProps {
  events: Event[];
}

export function EventsCard({ events }: EventsCardProps) {
  return (
    <div className="p-10 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm">
      <h4 className="text-primary font-headline text-xs font-bold tracking-widest uppercase mb-8">
        Upcoming Events
      </h4>
      <ul className="space-y-8">
        {events.map((event, i) => (
          <li key={i} className="group cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-on-surface group-hover:text-primary transition-colors">
                  {event.title}
                </div>
                <div className="text-sm text-on-surface-variant">
                  {event.location}
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="font-bold text-primary">{event.date}</div>
                <div className="text-xs text-on-surface-variant uppercase">
                  {event.time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
