import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type DayGridProps<TEvent> = {
  selectedDate: Date;
  events: TEvent[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  formatDate: (date: Date) => string;
  formatTime: (iso: string) => string;
  onEventClick: (event: TEvent) => void;
  onTimeSlotClick: (date: Date, hour: number, minute: number) => void;
  getEventTimeRange: (event: TEvent) => { start: Date; end: Date } | null;
  getEventName: (event: TEvent) => string;
  getEventClassName?: (event: TEvent) => string;
  showPanel?: boolean;
};

export const DayGrid = <TEvent,>({
  selectedDate,
  events,
  onPrevWeek,
  onNextWeek,
  formatDate,
  formatTime,
  onEventClick,
  onTimeSlotClick,
  getEventTimeRange,
  getEventName,
  getEventClassName,
  showPanel = true,
}: DayGridProps<TEvent>) => {
  // Calculate the week range (Sunday to Saturday)
  const getWeekDays = (date: Date): Date[] => {
    const days: Date[] = [];
    const current = new Date(date);
    const dayOfWeek = current.getDay();
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - dayOfWeek);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(selectedDate);
  const startDate = weekDays[0];
  const endDate = weekDays[6];

  // Generate time slots from 9am to 5pm
  const timeSlots: { hour: number; minute: number }[] = [];
  for (let hour = 9; hour < 17; hour++) {
    timeSlots.push({ hour, minute: 0 });
    timeSlots.push({ hour, minute: 30 });
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const range = getEventTimeRange(event);
      if (!range) return false;
      return isSameDay(range.start, date);
    });
  };

  // Position events in the grid
  const getEventPosition = (event: TEvent, dayDate: Date) => {
    const range = getEventTimeRange(event);
    if (!range) return null;

    const startHour = range.start.getHours();
    const startMinute = range.start.getMinutes();
    const endHour = range.end.getHours();
    const endMinute = range.end.getMinutes();

    // Calculate position relative to 9am start
    const startOffset = (startHour - 9) * 2 + (startMinute >= 30 ? 1 : 0);
    const endOffset = (endHour - 9) * 2 + (endMinute >= 30 ? 1 : 0);
    const slots = endOffset - startOffset || 1;

    return {
      top: startOffset * 60, // 60px per slot
      height: slots * 60,
      startTime: `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
      endTime: `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
    };
  };

  const formatWeekRange = () => {
    const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} - ${end}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  return (
    <div className={`calendar-section day-view-section ${!showPanel ? 'calendar-section-full' : ''}`}>
      <div className="month-navigation">
        <button onClick={onPrevWeek} className="cursor-pointer">
          <ChevronLeft />
        </button>
        <h2>{formatWeekRange()}</h2>
        <button onClick={onNextWeek} className="cursor-pointer">
          <ChevronRight />
        </button>
      </div>

      <div className="week-grid-container">
        <div className="week-header">
          <div className="time-column-header"></div>
          {weekDays.map((day, index) => (
            <div key={index} className={`day-column-header ${isToday(day) ? 'today-header' : ''}`}>
              <div className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="day-number">{day.getDate()}</div>
            </div>
          ))}
        </div>

        <div className="week-grid-body">
          <div className="time-slots-column">
            {timeSlots.map(({ hour, minute }) => (
              <div key={`${hour}-${minute}`} className="time-slot-label">
                {minute === 0 && (
                  <span>
                    {hour === 12 ? 12 : hour > 12 ? hour - 12 : hour}
                    {hour >= 12 ? 'pm' : 'am'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            
            return (
              <div key={dayIndex} className={`day-column ${isToday(day) ? 'today-column' : ''}`}>
                {timeSlots.map(({ hour, minute }) => (
                  <div
                    key={`${hour}-${minute}`}
                    className="time-slot-cell"
                    onClick={() => onTimeSlotClick(day, hour, minute)}
                  />
                ))}
                
                <div className="day-events-overlay">
                  {dayEvents.map((event, idx) => {
                    const position = getEventPosition(event, day);
                    if (!position) return null;

                    const eventClassName = getEventClassName ? getEventClassName(event) : '';

                    return (
                      <div
                        key={idx}
                        className={`week-event ${eventClassName}`}
                        style={{
                          top: `${position.top}px`,
                          height: `${position.height}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="event-time-compact">{position.startTime}</div>
                        <div className="event-name-compact">{getEventName(event)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
