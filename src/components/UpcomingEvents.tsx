import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
}

const UpcomingEvents = ({ collapsed }: { collapsed: boolean }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true })
      .limit(5)
      .then(({ data }) => {
        if (data) setEvents(data as Event[]);
      });
  }, []);

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        {events.length > 0 && (
          <span className="text-[10px] font-bold text-primary">{events.length}</span>
        )}
      </div>
    );
  }

  return (
    <div className="px-3 py-2 space-y-2">
      <p className="text-xs font-bold text-primary flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" />
        Upcoming Events
      </p>
      {events.length === 0 ? (
        <p className="text-[11px] text-muted-foreground px-1">No upcoming events</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="p-2 rounded-lg bg-primary/5 border border-primary/10 space-y-0.5"
          >
            <p className="text-xs font-semibold text-foreground truncate">{event.title}</p>
            <p className="text-[10px] text-primary font-mono">
              {format(new Date(event.event_date), "MMM d, h:mm a")}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingEvents;
