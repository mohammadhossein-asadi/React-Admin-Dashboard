import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DateSelectArg, EventApi } from "@fullcalendar/core";

export default function CalendarPage() {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleDateClick = (selected: DateSelectArg) => {
    const title = window.prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.start,
        end: selected.end,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected: { event: { title: string; remove: () => void } }) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Events</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {currentEvents.length === 0 && (
                <p className="text-sm text-muted-foreground">No events yet. Click on a date to add one.</p>
              )}
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-md bg-success/10 p-3"
                >
                  <p className="font-medium text-success">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.start && formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <FullCalendar
              height="70vh"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable
              selectable
              selectMirror
              dayMaxEvents
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                { id: "12315", title: "All-day event", date: "2024-09-14" },
                { id: "5123", title: "Timed event", date: "2024-09-28" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
