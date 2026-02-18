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

interface CalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  hangoutLink?: string;
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
  const [viewMode, setViewMode] = useState<'month' | 'day'>('day');
  const [refreshKey, setRefreshKey] = useState(0);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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

  // Generate 30-minute time slots for 24 hours (0:00 to 23:30) in local timezone
  const generateTimeSlots = (date: Date): string[] => {
    const slots: string[] = [];
    
    // Generate slots for 24 hours (0:00 to 23:30)
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += slotDefaultDuration) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeSlot);
      }
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

  const openLocalCreateEvent = (date?: Date | null, presetTime?: { hour: number; minute: number }) => {
    const base = date ? new Date(date) : selectedDate ? new Date(selectedDate) : new Date();
    
    if (!presetTime) {
      base.setHours(0, 0, 0, 0);
    }

    setLocalCreateError(null);
    setLocalCreateName('');
    setLocalCreateEmail('');
    setLocalCreatePhone('');
    setLocalCreateStartDateTime('');
    setLocalCreateEndDateTime('');
    setLocalSelectedDateForCreate(base);
    
    // If preset time is provided, auto-select that time slot
    if (presetTime) {
      const { hour, minute } = presetTime;
      const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      setLocalSelectedTimeSlot(timeSlot);
      
      const startDate = new Date(base);
      startDate.setHours(hour, minute, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + slotDefaultDuration);
      
      setLocalCreateStartDateTime(toLocalDateTimeInput(startDate));
      setLocalCreateEndDateTime(toLocalDateTimeInput(endDate));
    } else {
      setLocalSelectedTimeSlot(null);
    }
    
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email address');  
      if (!phone) throw new Error('Phone is required');
      if (!/^\+?[0-9]{7,}$/.test(phone)) throw new Error('Invalid phone number');
      if (!localSelectedTimeSlot) throw new Error('Please select a time slot');
      if (!localCreateStartDateTime || !localCreateEndDateTime) throw new Error('Please select a time slot');

      const s = new Date(localCreateStartDateTime);
      const e = new Date(localCreateEndDateTime);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) throw new Error('Invalid start/end date');
      if (e <= s) throw new Error('End time must be after start time');

      // if generateTimeSlots and selectedTimeSlot are defined, validate selected slot is valid
      if (localSelectedDateForCreate && localSelectedTimeSlot) {
        const validSlots = generateTimeSlots(localSelectedDateForCreate);
        if (!validSlots.includes(localSelectedTimeSlot)) {
          throw new Error('Selected time slot is outside of working hours');
        }
        if (isSlotBooked(localSelectedDateForCreate, localSelectedTimeSlot)) {
          throw new Error('Selected time slot is already booked. Please choose another time.');
        }
      }
      const newId = safeUuid();
      const startIso = s.toISOString();
      const endIso = e.toISOString();

      // Generate Google Meet link via server API
      let meetUrl = '';
      try {
        const meetResponse = await fetch('https://luther.health/api/create-meet-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone: phone || '',
            startTime: startIso,
            endTime: endIso,
            inquiryId: newId
          })
        });
        
        if (meetResponse.ok) {
          const meetData = await meetResponse.json();
          meetUrl = meetData.meetUrl;
          console.log('✅ Google Meet link generated:', meetUrl, `(${meetData.method})`);
        } else {
          // Fallback to client-side generation
          console.log('⚠️  Using fallback instant Meet link:', meetUrl);
        }
      } catch (meetError) {
        console.warn('⚠️  Failed to generate Meet link via API, using fallback:', meetError);

      }

      const { data, error } = await supabase
        .from('inquiry')
        .insert({
          id: newId,
          name,
          email,
          phone: phone || null,
          start: startIso,
          end: endIso,
          meet_url: meetUrl,
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
          await fetch('https://luther.health/api/schedule-reminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              inquiryId: newId,
              name,
              email,
              phone: phone || '',
              startTime: startIso,
              meetUrl: meetUrl
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

  const goPrevDay = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
  };

  const goNextDay = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setDate(newDate.getDate() + 1);
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
                   {selectedEvent?.hangoutLink && (
                    <Button asChild>
                      <a
                        href={selectedEvent.hangoutLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Meet
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

 

          {/* HEADER */}
          <CalendarHeader
            subtitle="Click on the date to add an appointment."
            rightContent={(
              <>
                <Button variant="default" size="lg" className="cursor-pointer" onClick={goToday}>Today</Button>
                <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                  <Button
                    variant={viewMode === 'month' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setViewMode('month')}
                    className="cursor-pointer"
                  >
                    Month
                  </Button>
                  <Button
                    variant={viewMode === 'day' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setViewMode('day')}
                    className="cursor-pointer"
                  >
                    Day
                  </Button>
                </div>
                <Button variant="default" size="lg" className="cursor-pointer" onClick={() => openLocalCreateEvent(selectedDate ?? new Date())}>Create appointment</Button>
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
              ) : (
                <DayGrid
                  selectedDate={selectedDate || currentDate}
                  events={events}
                  onPrevWeek={goPrevDay}
                  onNextWeek={goNextDay}
                  formatDate={(date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  formatTime={formatTime}
                  onEventClick={setSelectedEvent}
                  onTimeSlotClick={(date, hour, minute) => {
                    openLocalCreateEvent(date, { hour, minute });
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
                  getEventName={(event) => event.summary || 'Event'}
                  getEventClassName={(event) => isInquiryEvent(event) ? 'week-event-inquiry' : 'week-event-google'}
                  showPanel={showEventsPanel}
                  useFullDayHours={true}
                />
              )}
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
