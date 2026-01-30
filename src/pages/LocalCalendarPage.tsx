import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';
import { CalendarHeader } from '../components/CalendarHeader';
import { CreateAppointmentDialog } from '../components/CreateAppointmentDialog';
import { MonthGrid } from '../components/MonthGrid';
import { EventsPanel } from '../components/EventsPanel';
import './CalendarPage.theme.css';

type LocalCalendarEvent = {
  id: string;
  name?: string;
  email?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
};

type InquiryRow = {
  id: string;
  created_at?: string;
  name?: string | null;
  email?: string | null;
  start?: string | null;
  end?: string | null;
};

function safeUuid() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = globalThis.crypto as any;
  return typeof c?.randomUUID === 'function'
    ? c.randomUUID()
    : `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function toLocalEvent(row: InquiryRow): LocalCalendarEvent | null {
  if (!row?.id) return null;

  const startIso = typeof row.start === 'string' ? row.start : null;
  const endIso = typeof row.end === 'string' ? row.end : null;
  if (!startIso) return null;

  return {
    id: row.id,
    name: typeof row.name === 'string' ? row.name : undefined,
    email: typeof row.email === 'string' ? row.email : undefined,
    start: { dateTime: startIso ?? undefined },
    end: { dateTime: endIso ?? undefined },
  };
}

export const LocalCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<LocalCalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<LocalCalendarEvent | null>(null);
  const [eventsPanelMode, setEventsPanelMode] = useState<'day' | 'upcoming'>('upcoming');

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createStartDateTime, setCreateStartDateTime] = useState('');
  const [createEndDateTime, setCreateEndDateTime] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [selectedDateForCreate, setSelectedDateForCreate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const slotDefaultDuration = 30;
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('inquiry')
        .select('id, created_at, name, email, start, status, end')
        .order('created_at', { ascending: false })
        .limit(500);

      if (cancelled) return;

      if (error) {
        setError(error.message || String(error));
        setEvents([]);
        setLoading(false);
        return;
      }

      const rows = Array.isArray(data) ? (data as InquiryRow[]) : [];
      const mapped = rows.map(toLocalEvent).filter(Boolean) as LocalCalendarEvent[];
      setEvents(mapped);
      setLoading(false);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const normalizeDate = (event: LocalCalendarEvent) => {
    if (event.start?.date) return new Date(event.start.date + 'T00:00:00');
    if (event.start?.dateTime) return new Date(event.start.dateTime);
    return null;
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  const formatMonthYear = (date: Date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const toLocalDateInput = (date: Date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 10);
  };

  const toLocalDateTimeInput = (date: Date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
  };

  const formatAllDayRange = (event: LocalCalendarEvent) => {
    const startDate = event.start?.date ? new Date(event.start.date + 'T00:00:00') : null;
    const endDateExclusive = event.end?.date ? new Date(event.end.date + 'T00:00:00') : null;

    if (!startDate && !endDateExclusive) return 'All day';
    if (startDate && !endDateExclusive) {
      return `${startDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} (All day)`;
    }

    if (!startDate || !endDateExclusive) return 'All day';

    // end date is exclusive
    const endInclusive = new Date(endDateExclusive);
    endInclusive.setDate(endInclusive.getDate() - 1);

    const startLabel = startDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const endLabel = endInclusive.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return startLabel === endLabel ? `${startLabel} (All day)` : `${startLabel} → ${endLabel} (All day)`;
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: { date: Date | null; events: LocalCalendarEvent[] }[] = [];

    for (let i = 0; i < firstDay; i++) cells.push({ date: null, events: [] });

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter((e) => {
        const d = normalizeDate(e);
        return d ? isSameDay(d, date) : false;
      });
      cells.push({ date, events: dayEvents });
    }

    return cells;
  }, [currentDate, events]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((e) => {
      const d = normalizeDate(e);
      return d ? isSameDay(d, selectedDate) : false;
    });
  }, [events, selectedDate]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return events
      .map((e) => {
        const start = e.start?.dateTime ? new Date(e.start.dateTime) : e.start?.date ? new Date(e.start.date + 'T00:00:00') : null;
        return { e, start };
      })
      .filter(({ e, start }) => {
        if (!start) return false;
        const isAllDay = !!e.start?.date;
        return isAllDay ? start >= startOfToday : start >= now;
      })
      .sort((a, b) => (a.start!.getTime() - b.start!.getTime()))
      .slice(0, 15)
      .map(({ e }) => e);
  }, [events]);

  const goPrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const goToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setEventsPanelMode('day');
  };

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isSelected = (date: Date) => (selectedDate ? isSameDay(date, selectedDate) : false);

  // Generate 30-minute time slots for working hours (9am-5pm)
  const generateTimeSlots = (date: Date): string[] => {
    const slots: string[] = [];
    const baseDate = new Date(date);
    baseDate.setHours(9, 0, 0, 0); // Start at 9am
    
    // Generate slots until 5pm (17:00)
    while (baseDate.getHours() < 17) {
      const hours = baseDate.getHours().toString().padStart(2, '0');
      const minutes = baseDate.getMinutes().toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      baseDate.setMinutes(baseDate.getMinutes() + slotDefaultDuration);
    }
    
    return slots;
  };

  // Check if a time slot is already booked
  const isSlotBooked = (date: Date, timeSlot: string): boolean => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + slotDefaultDuration);

    // Check if any event overlaps with this slot
    return events.some((event) => {
      if (!event.start?.dateTime || !event.end?.dateTime) return false;
      
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      
      // Check if events are on the same day
      if (!isSameDay(eventStart, date)) return false;
      
      // Check for overlap: slot overlaps if slotStart < eventEnd && slotEnd > eventStart
      return slotStart < eventEnd && slotEnd > eventStart;
    });
  };

  const openCreateEvent = (date?: Date | null) => {
    const base = date ? new Date(date) : selectedDate ? new Date(selectedDate) : new Date();
    base.setHours(0, 0, 0, 0); // Reset to midnight for date selection
    
    setCreateError(null);
    setCreateName('');
    setCreateEmail('');
    setCreateStartDateTime('');
    setCreateEndDateTime('');
    setSelectedDateForCreate(base);
    setSelectedTimeSlot(null);
    if (date) setSelectedDate(date);
    setCreateDialogOpen(true);
  };

  // Update start and end datetime when time slot is selected
  const handleTimeSlotSelect = (timeSlot: string) => {
    if (!selectedDateForCreate) return;
    
    setSelectedTimeSlot(timeSlot);
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startDate = new Date(selectedDateForCreate);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + slotDefaultDuration); // Add 30 minutes
    
    setCreateStartDateTime(toLocalDateTimeInput(startDate));
    setCreateEndDateTime(toLocalDateTimeInput(endDate));
  };

  const createLocalEvent = async () => {
    setCreateError(null);

    try {
      const name = createName.trim();
      const email = createEmail.trim();
      if (!name) throw new Error('Name is required');
      if (!email) throw new Error('Email is required');
      if (!selectedTimeSlot) throw new Error('Please select a time slot');
      if (!createStartDateTime || !createEndDateTime) throw new Error('Please select a time slot');

      const s = new Date(createStartDateTime);
      const e = new Date(createEndDateTime);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) throw new Error('Invalid start/end date');
      if (e <= s) throw new Error('End time must be after start time');

      const newEvent: LocalCalendarEvent = {
        id: safeUuid(),
        name,
        email,
        start: { dateTime: s.toISOString() },
        end: { dateTime: e.toISOString() },
      };

      const { data, error } = await supabase
        .from('inquiry')
        .insert({
          id: newEvent.id,
          name: newEvent.name,
          email: newEvent.email,
          start: newEvent.start.dateTime,
          end: newEvent.end.dateTime,
        })
        .select('id, created_at, name, email, start, end')
        .single();

      if (error) throw new Error(error.message || String(error));

      const inserted = toLocalEvent(data as InquiryRow) ?? newEvent;
      setEvents((prev) => [inserted, ...prev]);

      const d = normalizeDate(inserted);
      if (d) setSelectedDate(d);
      setEventsPanelMode('day');

      setCreateDialogOpen(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setCreateError(msg);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar-card">
          <Dialog
            open={!!selectedEvent}
            onOpenChange={(open) => {
              if (!open) setSelectedEvent(null);
            }}
          >
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedEvent?.name || '(No name)'}</DialogTitle>
                <DialogDescription>Calendar event details</DialogDescription>
              </DialogHeader>

              {selectedEvent && (
                <div className="grid gap-3">
                  <div className="text-sm">
                    <div className="font-medium">When</div>
                    <div className="text-muted-foreground">
                      {selectedEvent.start?.date
                        ? formatAllDayRange(selectedEvent)
                        : selectedEvent.start?.dateTime && selectedEvent.end?.dateTime
                          ? `${formatDateTime(selectedEvent.start.dateTime)} – ${formatDateTime(selectedEvent.end.dateTime)}`
                          : '—'}
                    </div>
                  </div>

                  {selectedEvent.name && (
                    <div className="text-sm">
                      <div className="font-medium">Name</div>
                      <div className="text-muted-foreground">{selectedEvent.name}</div>
                    </div>
                  )}

                  {selectedEvent.email && (
                    <div className="text-sm">
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">{selectedEvent.email}</div>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter className="sm:justify-between">
                <div className="text-xs text-muted-foreground">Event ID: {selectedEvent?.id}</div>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <CreateAppointmentDialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            title="Book an appointment"
            description=""
            error={createError}
            name={createName}
            email={createEmail}
            onNameChange={setCreateName}
            onEmailChange={setCreateEmail}
            dateForCreate={selectedDateForCreate}
            generateTimeSlots={generateTimeSlots}
            isSlotBooked={isSlotBooked}
            selectedSlot={selectedTimeSlot}
            onSelectSlot={handleTimeSlotSelect}
            onCreate={createLocalEvent}
            onCancel={() => setCreateDialogOpen(false)}
          />

          <CalendarHeader
            subtitle="Click on the date to add an appointment."
            rightContent={(
              <>
                <button className="today-button" onClick={goToday}>Today</button>
                <button className="today-button" onClick={() => setEventsPanelMode('upcoming')}>Upcoming</button>
              </>
            )}
          />

          <div className="calendar-content">
            <div className="calendar-grid">
              <MonthGrid
                currentDate={currentDate}
                formatMonthYear={formatMonthYear}
                days={calendarDays}
                isToday={isToday}
                isSelected={isSelected}
                onPrevMonth={goPrevMonth}
                onNextMonth={goNextMonth}
                onDayClick={(date) => {
                  setSelectedDate(date);
                  setEventsPanelMode('day');
                  openCreateEvent(date);
                }}
                renderDayEvents={(dayEvents, date) =>
                  dayEvents.length > 0 ? (
                    <div className="day-events">
                      {dayEvents.slice(0, 3).map((event) => {
                        let miniTime = '';
                        if (event.start?.dateTime) {
                          miniTime = formatTime(event.start.dateTime);
                        }

                        const miniTitleBase = event.name || 'Event';
                        const miniLabel = miniTime ? `${miniTime} — ${miniTitleBase}` : miniTitleBase;

                        return (
                          <div
                            key={event.id}
                            className="mini-event mini-event-inquiry"
                            title={miniLabel}
                            role="button"
                            tabIndex={0}
                            onClick={(ev) => {
                              ev.preventDefault();
                              ev.stopPropagation();
                              setSelectedEvent(event);
                              const d = normalizeDate(event);
                              if (d) setSelectedDate(d);
                              setEventsPanelMode('day');
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key !== 'Enter' && ev.key !== ' ') return;
                              ev.preventDefault();
                              ev.stopPropagation();
                              setSelectedEvent(event);
                              const d = normalizeDate(event);
                              if (d) setSelectedDate(d);
                              setEventsPanelMode('day');
                            }}
                          >
                            {miniLabel}
                          </div>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="mini-event more">+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  ) : null
                }
              />
              <EventsPanel
                mode={eventsPanelMode}
                onModeChange={setEventsPanelMode}
                selectedDate={selectedDate}
                dayEvents={selectedDayEvents}
                upcomingEvents={upcomingEvents}
                formatSelectedDate={(date) =>
                  date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                }
                dayEmptyMessage="No events on this day"
                upcomingEmptyMessage="No upcoming events"
                renderEvent={(e, mode) => {
                  const isAllDay = !!e.start?.date;
                  const whenLabel = isAllDay
                    ? formatAllDayRange(e)
                    : e.start?.dateTime && e.end?.dateTime
                      ? `${formatDateTime(e.start.dateTime)} – ${formatDateTime(e.end.dateTime)}`
                      : '—';

                  return (
                    <button
                      key={e.id}
                      type="button"
                      className="event-card event-inquiry"
                      onClick={() => {
                        setSelectedEvent(e);
                        const d = normalizeDate(e);
                        if (d) setSelectedDate(d);
                      }}
                    >
                      <h4 className="event-title">{e.name || '(No name)'}</h4>
                      <p>
                        {mode === 'upcoming'
                          ? whenLabel
                          : isAllDay
                            ? 'All day'
                            : `${formatTime(e.start!.dateTime!)} – ${formatTime(e.end!.dateTime!)}`}
                      </p>
                      {e.email && <p className="event-description">{e.email}</p>}
                    </button>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

