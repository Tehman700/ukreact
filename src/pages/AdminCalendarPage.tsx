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

interface CalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
}

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

// Convert inquiry row to CalendarEvent format
function inquiryToCalendarEvent(row: InquiryRow): CalendarEvent | null {
  if (!row?.id) return null;

  const startIso = typeof row.start === 'string' ? row.start : null;
  const endIso = typeof row.end === 'string' ? row.end : null;
  if (!startIso) return null;

  const name = typeof row.name === 'string' ? row.name : 'Appointment';
  const email = typeof row.email === 'string' ? row.email : '';
  const phone = typeof row.phone === 'string' ? row.phone : '';
  let description = `Name: ${name}`;
  if (email) description += `\nEmail: ${email}`;
  if (phone) description += `\nPhone: ${phone}`;

  return {
    id: `inquiry_${row.id}`,
    summary: name,
    description: description,
    start: { dateTime: startIso },
    end: { dateTime: endIso ?? undefined },
  };
}

export const AdminCalendarPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string | undefined;
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
  const oauthClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string | undefined;

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [googleEvents, setGoogleEvents] = useState<CalendarEvent[]>([]);
  const [inquiryEvents, setInquiryEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventsPanelMode, setEventsPanelMode] = useState<'day' | 'upcoming'>('upcoming');
  const [showEventsPanel, setShowEventsPanel] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createAllDay, setCreateAllDay] = useState(false);
  const [createStartDateTime, setCreateStartDateTime] = useState('');
  const [createEndDateTime, setCreateEndDateTime] = useState('');
  const [createStartDate, setCreateStartDate] = useState('');
  const [createEndDate, setCreateEndDate] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Local (Supabase inquiry) appointment creation state
  const [localCreateDialogOpen, setLocalCreateDialogOpen] = useState(false);
  const [localCreateName, setLocalCreateName] = useState('');
  const [localCreateEmail, setLocalCreateEmail] = useState('');
  const [localCreatePhone, setLocalCreatePhone] = useState('');
  const [localCreateStartDateTime, setLocalCreateStartDateTime] = useState('');
  const [localCreateEndDateTime, setLocalCreateEndDateTime] = useState('');
  const [localCreateError, setLocalCreateError] = useState<string | null>(null);
  const [localSelectedDateForCreate, setLocalSelectedDateForCreate] = useState<Date | null>(null);
  const [localSelectedTimeSlot, setLocalSelectedTimeSlot] = useState<string | null>(null);

  const tokenClientRef = React.useRef<any>(null);
  const slotDefaultDuration = 30;


  /* ---------------------------------- AUTH (GOOGLE OAUTH) ---------------------------------- */
  useEffect(() => {
    setAuthError(null);
    setAuthReady(false);
    tokenClientRef.current = null;

    if (!oauthClientId) return;

    let cancelled = false;
    const tryInit = () => {
      const google = window.google;
      const initTokenClient = google?.accounts?.oauth2?.initTokenClient;
      if (!initTokenClient) return false;

      tokenClientRef.current = initTokenClient({
        client_id: oauthClientId,
        scope: 'https://www.googleapis.com/auth/calendar.events',
        callback: () => {},
      });

      if (!cancelled) setAuthReady(true);
      return true;
    };

    if (tryInit()) return;

    const intervalId = window.setInterval(() => {
      if (tryInit()) window.clearInterval(intervalId);
    }, 250);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      if (!cancelled && !tokenClientRef.current) {
        setAuthError('Google auth failed to initialize (GIS script not loaded)');
      }
    }, 10_000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [oauthClientId]);

  const requestAccessToken = async (prompt: '' | 'consent' = '') => {
    setAuthError(null);

    if (!oauthClientId) throw new Error('Missing VITE_GOOGLE_OAUTH_CLIENT_ID');
    if (!tokenClientRef.current) throw new Error('Google auth not ready yet');

    const tokenClient = tokenClientRef.current;

    return await new Promise<string>((resolve, reject) => {
      tokenClient.callback = (resp: any) => {
        if (!resp) return reject(new Error('No token response'));
        if (resp.error) return reject(new Error(resp.error));
        if (!resp.access_token) return reject(new Error('No access token returned'));

        setAccessToken(resp.access_token);
        resolve(resp.access_token);
      };

      tokenClient.requestAccessToken({ prompt });
    }).catch((e) => {
      const msg = e instanceof Error ? e.message : String(e);
      setAuthError(msg);
      throw e;
    });
  };

  const signOut = () => {
    if (!accessToken) return;
    try {
      window.google?.accounts?.oauth2?.revoke?.(accessToken, () => {});
    } finally {
      setAccessToken(null);
      setEvents([]);
      setSelectedEvent(null);
    }
  };

  /* ---------------------------------- FETCH GOOGLE CALENDAR EVENTS ---------------------------------- */
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      window.location.hash = 'admin-login';
      return;
    }

    if (!calendarId) return;
    if (!accessToken && !apiKey) return;

    setLoading(true);
    setError(null);

    const startOfRange = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const endOfRange = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    if (!accessToken && apiKey) url.searchParams.set('key', apiKey);
    url.searchParams.set('timeMin', startOfRange.toISOString());
    url.searchParams.set('timeMax', endOfRange.toISOString());
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('maxResults', '250');

    fetch(url.toString(), {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setGoogleEvents(Array.isArray(data.items) ? data.items : []))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [apiKey, calendarId, currentDate, accessToken, refreshKey]);

  /* ---------------------------------- FETCH INQUIRY EVENTS ---------------------------------- */
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) return;

    let cancelled = false;
    const run = async () => {
      const { data, error } = await supabase
        .from('inquiry')
        .select('id, created_at, name, email, phone, start, end')
        .order('created_at', { ascending: false })
        .limit(500);

      if (cancelled) return;

      if (error) {
        console.error('Error loading inquiry events:', error);
        setInquiryEvents([]);
        return;
      }

      const rows = Array.isArray(data) ? (data as InquiryRow[]) : [];
      const mapped = rows.map(inquiryToCalendarEvent).filter(Boolean) as CalendarEvent[];
      setInquiryEvents(mapped);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------- MERGE EVENTS ---------------------------------- */
  useEffect(() => {
    setEvents([...googleEvents, ...inquiryEvents]);
  }, [googleEvents, inquiryEvents]);

  /* ---------------------------------- HELPERS ---------------------------------- */
  const normalizeDate = (event: CalendarEvent) => {
    if (event.start?.date) {
      return new Date(event.start.date + 'T00:00:00');
    }
    if (event.start?.dateTime) {
      return new Date(event.start.dateTime);
    }
    return null;
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const formatMonthYear = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

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

  const formatAllDayRange = (event: CalendarEvent) => {
    const startDate = event.start?.date ? new Date(event.start.date + 'T00:00:00') : null;
    const endDateExclusive = event.end?.date ? new Date(event.end.date + 'T00:00:00') : null;

    if (!startDate && !endDateExclusive) return 'All day';
    if (startDate && !endDateExclusive) {
      return `${startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} (All day)`;
    }

    if (!startDate || !endDateExclusive) return 'All day';

    // Google Calendar all-day end.date is exclusive; display inclusive end.
    const endDateInclusive = new Date(endDateExclusive);
    endDateInclusive.setDate(endDateInclusive.getDate() - 1);

    const startLabel = startDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const endLabel = endDateInclusive.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return startLabel === endLabel ? `${startLabel} (All day)` : `${startLabel} → ${endLabel} (All day)`;
  };

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

  // Check if a time slot is already booked (against all merged events)
  const isSlotBooked = (date: Date, timeSlot: string): boolean => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + slotDefaultDuration);

    return events.some((event) => {
      const startIso = event.start?.dateTime;
      const endIso = event.end?.dateTime;
      if (!startIso || !endIso) return false;

      const eventStart = new Date(startIso);
      const eventEnd = new Date(endIso);

      if (!isSameDay(eventStart, date)) return false;

      // overlap if slotStart < eventEnd && slotEnd > eventStart
      return slotStart < eventEnd && slotEnd > eventStart;
    });
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const isUrl = (value: string) => /^(https?:\/\/|www\.)/i.test(value);

    const lines = text.split('\n');
    return lines.map((line, lineIdx) => (
      <React.Fragment key={lineIdx}>
        {line.split(urlRegex).map((part, partIdx) => {
          if (!isUrl(part)) return <React.Fragment key={partIdx}>{part}</React.Fragment>;

          let url = part;
          let trailing = '';
          while (url.length > 0 && /[)\].,!?]+$/.test(url)) {
            trailing = url.slice(-1) + trailing;
            url = url.slice(0, -1);
          }

          const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;

          return (
            <React.Fragment key={partIdx}>
              <a href={href} target="_blank" rel="noreferrer" className="underline">
                {url}
              </a>
              {trailing}
            </React.Fragment>
          );
        })}
        {lineIdx < lines.length - 1 ? <br /> : null}
      </React.Fragment>
    ));
  };

  const openLocalCreateEvent = (date?: Date | null) => {
    const base = date ? new Date(date) : selectedDate ? new Date(selectedDate) : new Date();
    base.setHours(0, 0, 0, 0);

    setLocalCreateError(null);
    setLocalCreateName('');
    setLocalCreateEmail('');
    setLocalCreatePhone('');
    setLocalCreateStartDateTime('');
    setLocalCreateEndDateTime('');
    setLocalSelectedDateForCreate(base);
    setLocalSelectedTimeSlot(null);
    if (date) setSelectedDate(date);
    setEventsPanelMode('day');
    setLocalCreateDialogOpen(true);
  };

  const handleLocalTimeSlotSelect = (timeSlot: string) => {
    if (!localSelectedDateForCreate) return;

    setLocalSelectedTimeSlot(timeSlot);

    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startDate = new Date(localSelectedDateForCreate);
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + slotDefaultDuration);

    setLocalCreateStartDateTime(toLocalDateTimeInput(startDate));
    setLocalCreateEndDateTime(toLocalDateTimeInput(endDate));
  };

  const createLocalAppointment = async () => {
    setLocalCreateError(null);

    try {
      const name = localCreateName.trim();
      const email = localCreateEmail.trim();
      const phone = localCreatePhone.trim();
      if (!name) throw new Error('Name is required');
      if (!email) throw new Error('Email is required');
      if (!localSelectedTimeSlot) throw new Error('Please select a time slot');
      if (!localCreateStartDateTime || !localCreateEndDateTime) throw new Error('Please select a time slot');

      const s = new Date(localCreateStartDateTime);
      const e = new Date(localCreateEndDateTime);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) throw new Error('Invalid start/end date');
      if (e <= s) throw new Error('End time must be after start time');

      const newId = safeUuid();
      const startIso = s.toISOString();
      const endIso = e.toISOString();

      const { data, error } = await supabase
        .from('inquiry')
        .insert({
          id: newId,
          name,
          email,
          phone: phone || null,
          start: startIso,
          end: endIso,
        })
        .select('id, created_at, name, email, phone, start, end')
        .single();

      if (error) throw new Error(error.message || String(error));

      const insertedRow = data as InquiryRow;
      const mapped = inquiryToCalendarEvent(insertedRow);
      if (mapped) {
        setInquiryEvents((prev) => [mapped, ...prev]);
        
        // Schedule automated reminder (30 minutes before appointment)
        try {
          await fetch('http://localhost:3003/api/schedule-reminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              inquiryId: newId,
              name,
              email,
              phone: phone || '',
              startTime: startIso
            })
          });
          console.log('✅ Reminder scheduled for inquiry:', newId);
        } catch (reminderError) {
          console.warn('⚠️  Failed to schedule reminder:', reminderError);
          // Don't fail the inquiry creation if reminder scheduling fails
        }
      }

      const d = normalizeDate(mapped ?? { start: { dateTime: startIso } } as CalendarEvent);
      if (d) setSelectedDate(d);
      setEventsPanelMode('day');

      setLocalCreateDialogOpen(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setLocalCreateError(msg);
    }
  };

  const openCreateEvent = () => {
    const base = selectedDate ? new Date(selectedDate) : new Date();
    base.setHours(9, 0, 0, 0);
    const end = new Date(base);
    end.setHours(10, 0, 0, 0);

    setCreateError(null);
    setCreateTitle('');
    setCreateAllDay(false);
    setCreateStartDateTime(toLocalDateTimeInput(base));
    setCreateEndDateTime(toLocalDateTimeInput(end));
    setCreateStartDate(toLocalDateInput(base));
    setCreateEndDate(toLocalDateInput(base));
    setCreateLocation('');
    setCreateDescription('');

    setCreateDialogOpen(true);
  };

  const createEventInCalendar = async () => {
    setCreateError(null);

    if (!calendarId) {
      setCreateError('Missing calendar id (VITE_GOOGLE_CALENDAR_ID)');
      return;
    }

    try {
      setCreateSubmitting(true);

      const token = accessToken ?? (await requestAccessToken('consent'));

      const payload: any = {
        summary: createTitle.trim() || '(No title)',
      };

      if (createLocation.trim()) payload.location = createLocation.trim();
      if (createDescription.trim()) payload.description = createDescription.trim();

      if (createAllDay) {
        const start = createStartDate || toLocalDateInput(new Date());
        const endInclusive = createEndDate || start;

        // Google all-day end date is exclusive.
        const endExclusive = new Date(endInclusive + 'T00:00:00');
        endExclusive.setDate(endExclusive.getDate() + 1);

        payload.start = { date: start };
        payload.end = { date: toLocalDateInput(endExclusive) };
      } else {
        const start = createStartDateTime ? new Date(createStartDateTime) : new Date();
        const end = createEndDateTime
          ? new Date(createEndDateTime)
          : new Date(start.getTime() + 60 * 60_000);

        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
          throw new Error('Invalid start/end date');
        }
        if (end <= start) {
          throw new Error('End time must be after start time');
        }

        payload.start = { dateTime: start.toISOString() };
        payload.end = { dateTime: end.toISOString() };
      }

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created = await res.json().catch(() => null);

      // Refresh list + focus created event day.
      const createdStart =
        created?.start?.date
          ? new Date(created.start.date + 'T00:00:00')
          : created?.start?.dateTime
            ? new Date(created.start.dateTime)
            : null;
      if (createdStart && !Number.isNaN(createdStart.getTime())) {
        setSelectedDate(createdStart);
      }

      setEventsPanelMode('day');
      setCreateDialogOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setCreateError(msg);
    } finally {
      setCreateSubmitting(false);
    }
  };

  /* ---------------------------------- CALENDAR GRID ---------------------------------- */
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: { date: Date | null; events: CalendarEvent[] }[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push({ date: null, events: [] });
    }

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
        const start =
          e.start?.dateTime
            ? new Date(e.start.dateTime)
            : e.start?.date
              ? new Date(e.start.date + 'T00:00:00')
              : null;

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

  /* ---------------------------------- NAVIGATION ---------------------------------- */
  const goPrevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const goNextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const goToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setEventsPanelMode('day');
  };

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isSelected = (date: Date) => (selectedDate ? isSameDay(date, selectedDate) : false);
  
  // Check if event is from inquiry database (prefixed with "inquiry_")
  const isInquiryEvent = (event: CalendarEvent) => event.id.startsWith('inquiry_');

  /* ---------------------------------- RENDER ---------------------------------- */
  return (
    <div className="container mx-auto px-4 py-12">
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
                <DialogTitle>{selectedEvent?.summary || '(No title)'}</DialogTitle>
                <DialogDescription>Google Calendar event details</DialogDescription>
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

                  {selectedEvent.location && (
                    <div className="text-sm">
                      <div className="font-medium">Location</div>
                      <div className="text-muted-foreground">{selectedEvent.location}</div>
                    </div>
                  )}

                  {selectedEvent.description && (
                    <div className="text-sm">
                      <div className="font-medium">Description</div>
                      <div className="text-muted-foreground whitespace-pre-wrap">
                        {renderTextWithLinks(selectedEvent.description)}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="text-xs text-muted-foreground">Event ID: {selectedEvent?.id}</div>
              <DialogFooter className="sm:justify-between">
                <div className="flex gap-2">
                  {selectedEvent?.htmlLink && (
                    <Button asChild>
                      <a
                        href={selectedEvent.htmlLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Calendar
                      </a>
                    </Button>
                  )}
                </div>
                <Button variant="outline" className="cursor-pointer" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <CreateAppointmentDialog
            open={localCreateDialogOpen}
            onOpenChange={setLocalCreateDialogOpen}
            title="Create appointment (internal)"
            description="Creates an appointment in the local inquiry calendar."
            error={localCreateError}
            name={localCreateName}
            email={localCreateEmail}
            phone={localCreatePhone}
            onNameChange={setLocalCreateName}
            onEmailChange={setLocalCreateEmail}
            onPhoneChange={setLocalCreatePhone}
            dateForCreate={localSelectedDateForCreate}
            generateTimeSlots={generateTimeSlots}
            isSlotBooked={isSlotBooked}
            selectedSlot={localSelectedTimeSlot}
            onSelectSlot={handleLocalTimeSlotSelect}
            onCreate={createLocalAppointment}
            onCancel={() => setLocalCreateDialogOpen(false)}
          />

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Google Calendar event</DialogTitle>
                <DialogDescription>
                  Creates the event directly in your Google Calendar (requires Google sign-in).
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                {!oauthClientId && (
                  <div className="rounded-md border p-3 text-sm">
                    Missing `VITE_GOOGLE_OAUTH_CLIENT_ID`. Add it to your environment to enable creating events.
                  </div>
                )}

                {authError && (
                  <div className="rounded-md border p-3 text-sm">
                    Auth error: {authError}
                  </div>
                )}

                {createError && (
                  <div className="rounded-md border p-3 text-sm">
                    Create error: {createError}
                  </div>
                )}

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Title</div>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    placeholder="Event title"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={createAllDay}
                    onChange={(e) => setCreateAllDay(e.target.checked)}
                  />
                  All day
                </label>

                {createAllDay ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Start date</div>
                      <input
                        type="date"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={createStartDate}
                        onChange={(e) => setCreateStartDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">End date</div>
                      <input
                        type="date"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={createEndDate}
                        onChange={(e) => setCreateEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Start</div>
                      <input
                        type="datetime-local"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={createStartDateTime}
                        onChange={(e) => setCreateStartDateTime(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">End</div>
                      <input
                        type="datetime-local"
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={createEndDateTime}
                        onChange={(e) => setCreateEndDateTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Location</div>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={createLocation}
                    onChange={(e) => setCreateLocation(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Description</div>
                  <textarea
                    className="min-h-28 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm"
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <div className="flex gap-2">
                  {!accessToken ? (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!authReady || !oauthClientId}
                      onClick={() => void requestAccessToken('consent')}
                      className="cursor-pointer"
                    >
                      Connect Calendar
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" className="cursor-pointer" onClick={signOut}>
                      Disconnect Calendar
                    </Button>
                  )}

                  <Button
                    type="button"
                    disabled={
                      !oauthClientId ||
                      !calendarId ||
                      createSubmitting ||
                      (!accessToken && !authReady)
                    }
                    onClick={() => void createEventInCalendar()}
                    className="cursor-pointer"
                  >
                    {createSubmitting ? 'Creating…' : 'Create'}
                  </Button>
                </div>
                <Button variant="outline" className="cursor-pointer" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          

          {/* HEADER */}
          <CalendarHeader
            subtitle="Click on the date to add an appointment."
            rightContent={(
              <>
                <Button variant="default" size="lg" className="cursor-pointer" onClick={goToday}>Today</Button>
                <Button variant="default" size="lg" className="cursor-pointer" onClick={() => openLocalCreateEvent(selectedDate ?? new Date())}>Create appointment</Button>
                <Button variant="default" size="lg" className="cursor-pointer" onClick={openCreateEvent}>Create Google Calendar event</Button>   
                {accessToken ? (
                  <Button variant="default" size="lg" className="cursor-pointer" onClick={signOut}>Disconnect Calendar</Button>
                ) : (
                  <Button variant="default" size="lg" className="cursor-pointer" onClick={() => void requestAccessToken('consent')}>Connect Calendar</Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowEventsPanel(!showEventsPanel)}
                  className="cursor-pointer"
                >
                  {showEventsPanel ? 'Hide Panel' : 'Show Panel'}
                </Button>
       
              </>
            )}
     
          />

          {/* CONFIG ERROR */}
          {(!calendarId || (!apiKey && !accessToken && !oauthClientId)) && (
            <div className="error-box">
              <div className="error-content">
                <div className="error-icon">⚠️</div>
                <div>
                  <div className="error-title">Configuration Required</div>
                  <div className="error-message">
                    {!calendarId
                      ? 'Set VITE_GOOGLE_CALENDAR_ID.'
                      : 'Set VITE_GOOGLE_CALENDAR_API_KEY (public read) or VITE_GOOGLE_OAUTH_CLIENT_ID (sign-in).'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {authError && (
            <div className="error-box">
              <div className="error-content">
                <div className="error-icon">⚠️</div>
                <div>
                  <div className="error-title">Google Sign-in Error</div>
                  <div className="error-message">{authError}</div>
                </div>
              </div>
            </div>
          )}

          {/* API ERROR */}
          {error && (
            <div className="error-box">
              <div className="error-content">
                <div className="error-icon cursor-pointer">❌</div>
                <div>
                  <div className="error-title">Error Loading Events</div>
                  <div className="error-message">{error}</div>
                </div>
              </div>
            </div>
          )}

          <div className="calendar-content">
            <div className="calendar-grid">

              {/* CALENDAR */}
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
                  setSelectedDate(date);
                  setEventsPanelMode('day');
                  openLocalCreateEvent(date);
                }}
                renderDayEvents={(dayEvents, date) =>
                  dayEvents.length > 0 ? (
                    <div className="day-events">
                      {dayEvents.slice(0, 3).map((event) => {
                        const isInquiry = isInquiryEvent(event);

                        let miniTime = '';
                        if (event.start?.dateTime && event.end?.dateTime) {
                          miniTime = formatTime(event.start.dateTime);
                        } else if (event.start?.date) {
                          miniTime = 'All day';
                        }

                        const miniTitleBase = event.summary || 'Event';
                        const miniLabel = miniTime ? `${miniTime} — ${miniTitleBase}` : miniTitleBase;

                        return (
                          <div
                            key={event.id}
                            className={`mini-event ${isInquiry ? 'mini-event-inquiry' : 'mini-event-google'}`}
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
              {/* EVENTS */}
              {showEventsPanel && (
                <EventsPanel
                hidden={false}
                mode={eventsPanelMode}
                onModeChange={setEventsPanelMode}
                selectedDate={selectedDate}
                isLoading={loading}
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

                  const isInquiry = isInquiryEvent(e);

                  const baseTitle = e.summary || '(No title)';
                  const timePrefix =
                    mode === 'upcoming'
                      ? whenLabel
                      : isAllDay
                        ? 'All day'
                        : e.start?.dateTime && e.end?.dateTime
                          ? `${formatTime(e.start.dateTime)} – ${formatTime(e.end.dateTime)}`
                          : '';
                  const titleWithTime = timePrefix ? `${baseTitle} - ${timePrefix} ` : baseTitle;

                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={`event-card cursor-pointer ${isInquiry ? 'event-inquiry' : 'event-google'}`}
                      onClick={() => {
                        setSelectedEvent(e);
                        const d = normalizeDate(e);
                        if (d) setSelectedDate(d);
                      }}
                      aria-label={`Open event details: ${titleWithTime}`}
                    >
                      <h4 className="event-title">{baseTitle}</h4>
                      {timePrefix && <p>{timePrefix}</p>}
                      {e.location && <p>{e.location}</p>}
                      {e.description && <p className="event-description">{e.description}</p>}
                    </button>
                  );
                }}
              />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
