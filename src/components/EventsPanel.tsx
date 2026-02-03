import React from 'react';
import { Button } from './ui/button';

export type EventsPanelMode = 'day' | 'upcoming';

type EventsPanelProps<TEvent> = {
  hidden?: boolean;
  mode: EventsPanelMode;
  onModeChange: (mode: EventsPanelMode) => void;
  selectedDate: Date | null;
  isLoading?: boolean;
  dayEvents: TEvent[];
  upcomingEvents: TEvent[];
  formatSelectedDate: (date: Date) => string;
  renderEvent: (event: TEvent, mode: EventsPanelMode) => React.ReactNode;
  dayEmptyMessage?: string;
  upcomingEmptyMessage?: string;
};

export const EventsPanel = <TEvent,>({
  hidden = false,
  mode,
  onModeChange,
  selectedDate,
  isLoading = false,
  dayEvents,
  upcomingEvents,
  formatSelectedDate,
  renderEvent,
  dayEmptyMessage = 'No events on this day',
  upcomingEmptyMessage = 'No upcoming events',
}: EventsPanelProps<TEvent>) => {
  const title =
    mode === 'upcoming'
      ? 'Upcoming events'
      : selectedDate
        ? formatSelectedDate(selectedDate)
        : 'Select a date';

  const currentList = mode === 'upcoming' ? upcomingEvents : dayEvents;

  return (
    <div className="events-panel">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="m-0">{title}</h3>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === 'day' ? 'default' : 'outline'}
            onClick={() => onModeChange('day')}
            className={hidden ? 'hidden' : 'cursor-pointer'}
          >
            Day
          </Button>
          <Button
            size="sm"
            variant={mode === 'upcoming' ? 'default' : 'outline'}
            onClick={() => onModeChange('upcoming')}
            className={hidden ? 'hidden' : 'cursor-pointer'}
          >
            Upcoming
          </Button>
        </div>
      </div>

      {isLoading && <p>Loading events…</p>}

      {!isLoading && mode === 'day' && selectedDate && dayEvents.length === 0 && (
        <p>{dayEmptyMessage}</p>
      )}

      {!isLoading && mode === 'upcoming' && upcomingEvents.length === 0 && (
        <p>{upcomingEmptyMessage}</p>
      )}

      <div className="events-list">
        {currentList.map((event, idx) => (
          <React.Fragment key={idx}>{renderEvent(event, mode)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

