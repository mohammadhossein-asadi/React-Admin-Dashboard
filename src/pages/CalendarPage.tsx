import { useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import type { DateSelectArg, EventApi } from "@fullcalendar/core";

export default function CalendarPage() {
  const { t } = useTranslation();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [eventToDelete, setEventToDelete] = useState<{ title: string; remove: () => void } | null>(
    null
  );

  const handleDateClick = useCallback((selected: DateSelectArg) => {
    setSelectedDate(selected);
    setNewEventTitle("");
    setCreateDialogOpen(true);
  }, []);

  const confirmCreateEvent = useCallback(() => {
    if (selectedDate && newEventTitle.trim()) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent({
        id: `${selectedDate.startStr}-${newEventTitle}`,
        title: newEventTitle.trim(),
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      });
    }
    setCreateDialogOpen(false);
    setNewEventTitle("");
    setSelectedDate(null);
  }, [selectedDate, newEventTitle]);

  const handleEventClick = useCallback(
    (selected: { event: { title: string; remove: () => void } }) => {
      setEventToDelete(selected.event);
      setDeleteDialogOpen(true);
    },
    []
  );

  const confirmDeleteEvent = useCallback(() => {
    if (eventToDelete) {
      eventToDelete.remove();
    }
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }, [eventToDelete]);

  return (
    <div className="space-y-6">
      <Header subtitle={t("Full Calendar Interactive Page")} />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">{t("Events")}</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {currentEvents.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {t("No events yet. Click on a date to add one.")}
                </p>
              )}
              {currentEvents.map((event) => (
                <div key={event.id} className="rounded-md bg-success/10 p-3">
                  <p className="font-medium text-success">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.start &&
                      formatDate(event.start, {
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
                { id: "12315", title: t("All-day event"), date: "2024-09-14" },
                { id: "5123", title: t("Timed event"), date: "2024-09-28" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Create New Event")}</DialogTitle>
            <DialogDescription>{t("Enter a title for your new calendar event.")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="event-title">{t("Event Title")}</Label>
            <Input
              id="event-title"
              placeholder={t("Event title")}
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmCreateEvent();
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={confirmCreateEvent} disabled={!newEventTitle.trim()}>
              {t("Create Event")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Delete Event")}</DialogTitle>
            <DialogDescription>
              {t(
                "Are you sure you want to delete the event '{{title}}'? This action cannot be undone.",
                {
                  title: eventToDelete?.title,
                }
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>
              {t("Delete Event")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
