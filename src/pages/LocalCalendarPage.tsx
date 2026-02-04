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
import { DayGrid } from '../components/DayGrid';
import { EventsPanel } from '../components/EventsPanel';
import './CalendarPage.theme.css';

type LocalCalendarEvent = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
};

type InquiryRow = {
  id: string;
  created_at?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
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
    phone: typeof row.phone === 'string' ? row.phone : undefined,
    start: { dateTime: startIso ?? undefined },
    end: { dateTime: endIso ?? undefined },
  };
}

export const LocalCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<LocalCalendarEvent[]>([]);
  const [bookEvents, setBookEvents] = useState<LocalCalendarEvent[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<LocalCalendarEvent | null>(null);
  const [eventsPanelMode, setEventsPanelMode] = useState<'day' | 'upcoming'>('day');
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'day'>('day');

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPhone, setCreatePhone] = useState('');
  const [createStartDateTime, setCreateStartDateTime] = useState('');
  const [createEndDateTime, setCreateEndDateTime] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [selectedDateForCreate, setSelectedDateForCreate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const slotDefaultDuration = 30;
  // Don't load existing events - only show events created in current session
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const yesterday = today.toISOString(); 
      const { data, error } = await supabase
        .from('inquiry')
        .select('id, created_at, name, email, phone, start, status, end')
        .gte('start', yesterday)
        .order('start', { ascending: true })
        .limit(500);

      if (cancelled) return;

      if (error) {
        setError(error.message || String(error));
        setBookEvents([]);
        setLoading(false);
        return;
      }

      const rows = Array.isArray(data) ? (data as InquiryRow[]) : [];
      const mapped = rows.map(toLocalEvent).filter(Boolean) as LocalCalendarEvent[];
      setBookEvents(mapped);
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
  const goPrevWeek = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };
  const goNextWeek = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };
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

  const openCreateEvent = (date?: Date | null, presetTime?: { hour: number; minute: number }) => {
    const base = date ? new Date(date) : selectedDate ? new Date(selectedDate) : new Date();
    
    // Don't reset hours if we have preset time
    if (!presetTime) {
      base.setHours(0, 0, 0, 0); // Reset to midnight for date selection
    }
    
    // Prevent creating appointments on past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(base);
    checkDate.setHours(0, 0, 0, 0);
    if (checkDate < today) {
      return; // Don't open dialog for past dates
    }
    
    setCreateError(null);
    setCreateName('');
    setCreateEmail('');
    setCreatePhone('');
    setCreateStartDateTime('');
    setCreateEndDateTime('');
    setSelectedDateForCreate(base);

    
    // If preset time is provided, auto-select that time slot
    if (presetTime) {
      const { hour, minute } = presetTime;
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      setSelectedTimeSlot(timeSlot);
      
      const startDate = new Date(base);
      startDate.setHours(hour, minute, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + slotDefaultDuration);
      
      setCreateStartDateTime(toLocalDateTimeInput(startDate));
      setCreateEndDateTime(toLocalDateTimeInput(endDate));
    } else {
      setSelectedTimeSlot(null);
    }
    
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
      const phone = createPhone.trim();
      if (!name) throw new Error('Name is required');
      if (!email) throw new Error('Email is required');
       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email address');  
      if (!phone) throw new Error('Phone is required');
      if (!/^\+?[0-9]{7,}$/.test(phone)) throw new Error('Invalid phone number');
      if (!selectedTimeSlot) throw new Error('Please select a time slot');
      if (!createStartDateTime || !createEndDateTime) throw new Error('Please select a time slot');

      const s = new Date(createStartDateTime);
      const e = new Date(createEndDateTime);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) throw new Error('Invalid start/end date');
      if (e <= s) throw new Error('End time must be after start time');

      // check selected slot is between 9am and 5pm
      const [slotHours, slotMinutes] = selectedTimeSlot.split(':').map(Number);
      if (slotHours < 9 || slotHours >= 17) {
        throw new Error('Selected time slot must be between 9am and 5pm');
      }

      const newEvent: LocalCalendarEvent = {
        id: safeUuid(),
        name,
        email,
        phone,
        start: { dateTime: s.toISOString() },
        end: { dateTime: e.toISOString() },
      };

      const { data, error } = await supabase
        .from('inquiry')
        .insert({
          id: newEvent.id,
          name: newEvent.name,
          email: newEvent.email,
          phone: newEvent.phone,
          start: newEvent.start.dateTime,
          end: newEvent.end.dateTime,
        })
        .select('id, created_at, name, email, phone, start, end')
        .single();

      if (error) throw new Error(error.message || String(error));

      const inserted = toLocalEvent(data as InquiryRow) ?? newEvent;
      setEvents((prev) => [inserted, ...prev]);
      setBookEvents((prev) => [inserted, ...prev]);

      // Schedule automated reminder (30 minutes before appointment)
      try {
        await fetch('https://luther.health/api/schedule-reminder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inquiryId: newEvent.id,
            name: newEvent.name,
            email: newEvent.email,
            phone: newEvent.phone,
            startTime: newEvent.start.dateTime
          })
        });
        console.log('✅ Reminder scheduled for inquiry:', newEvent.id);
      } catch (reminderError) {
        console.warn('⚠️  Failed to schedule reminder:', reminderError);
        // Don't fail the inquiry creation if reminder scheduling fails
      }

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
    <div className="container mx-auto px-4 py-12">
      <div className="calendar-wrapper">
        <div className="calendar-card">
          <Dialog
            open={!!selectedEvent}
            onOpenChange={(open: boolean) => {
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

                  {selectedEvent.phone && (
                    <div className="text-sm">
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">{selectedEvent.phone}</div>
                    </div>
                  )}
                </div>
              )}

              <DialogFooter className="sm:justify-between">
                <div className="text-xs text-muted-foreground">Event ID: {selectedEvent?.id}</div>
                <Button variant="outline" onClick={() => setSelectedEvent(null)} className="cursor-pointer">
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
            phone={createPhone}
            onNameChange={setCreateName}
            onEmailChange={setCreateEmail}
            onPhoneChange={setCreatePhone}
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
              <div className="view-toggle" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button
                  variant={viewMode === 'month' ? 'default' : 'outline'}
                  onClick={() => setViewMode('month')}
                  className="cursor-pointer"
                >
                  Month
                </Button>
                <Button
                  variant={viewMode === 'day' ? 'default' : 'outline'}
                  onClick={() => setViewMode('day')}
                  className="cursor-pointer"
                >
                  Day
                </Button>
              </div>
            )}
          />

          <div className="calendar-content">
            <div className="calendar-grid">
              {viewMode === 'month' ? (
                <MonthGrid
                  showPanel={showEventsPanel}
                  currentDate={currentDate}
                  formatMonthYear={formatMonthYear}
                  days={calendarDays}
                  isToday={isToday}
                  isSelected={isSelected}
                  onPrevMonth={goPrevMonth}
                  onNextMonth={goNextMonth}
                onDayClick={(date) => {
                  // Prevent clicking past dates
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const clickedDate = new Date(date);
                  clickedDate.setHours(0, 0, 0, 0);
                  if (clickedDate < today) {
                    return; // Don't allow past date selection
                  }
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
                              // setSelectedEvent(event);
                              // const d = normalizeDate(event);
                              // if (d) setSelectedDate(d);
                              setEventsPanelMode('day');
                            }}
                            onKeyDown={(ev) => {
                              if (ev.key !== 'Enter' && ev.key !== ' ') return;
                              ev.preventDefault();
                              ev.stopPropagation();
                              // setSelectedEvent(event);
                              // const d = normalizeDate(event);
                              // if (d) setSelectedDate(d);
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
              ) : (
                <DayGrid
                  selectedDate={selectedDate || currentDate}
                  events={events}
                  onPrevWeek={goPrevWeek}
                  onNextWeek={goNextWeek}
                  formatDate={(date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  formatTime={formatTime}
                  onEventClick={() => {}}
                  onTimeSlotClick={(date, hour, minute) => {
                    openCreateEvent(date, { hour, minute });
                  }}
                  getEventTimeRange={(event) => {
                    if (event.start?.dateTime && event.end?.dateTime) {
                      return {
                        start: new Date(event.start.dateTime),
                        end: new Date(event.end.dateTime)
                      };
                    }
                    return null;
                  }}
                  getEventName={(event) => event.name || 'Event'}
                  showPanel={showEventsPanel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

