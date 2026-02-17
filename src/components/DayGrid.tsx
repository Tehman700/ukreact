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
  useFullDayHours?: boolean;
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
  useFullDayHours = false,
}: DayGridProps<TEvent>) => {
  // Show only the selected day
  const weekDays = [selectedDate];
  const startDate = selectedDate;
  const endDate = selectedDate;

  // Calculate UK business hours (9am-5pm UK) in local timezone
  const calculateLocalBusinessHours = () => {
    const testDate = new Date(selectedDate);
    testDate.setHours(12, 0, 0, 0);
    
    // Get UK timezone offset (GMT=0, BST=+1)
    const ukOffsetStr = testDate.toLocaleTimeString('en-US', { 
      timeZone: 'Europe/London', 
      timeZoneName: 'short' 
    }).split(' ').pop() || 'GMT';
    const isGMT = ukOffsetStr === 'GMT';
    const ukOffsetHours = isGMT ? 0 : 1;
    
    // Create UTC times for 9am and 5pm UK time
    const ukStartUTC = new Date(Date.UTC(
      testDate.getFullYear(),
      testDate.getMonth(),
      testDate.getDate(),
       ukOffsetHours,
      0
    ));
    
    const ukEndUTC = new Date(Date.UTC(
      testDate.getFullYear(),
      testDate.getMonth(),
      testDate.getDate(),
      24 - ukOffsetHours,
      0
    ));
    
    return {
      startHour: ukStartUTC.getHours(),
      endHour: ukEndUTC.getHours()
    };
  };

  const { startHour: businessStartHour, endHour: businessEndHour } = calculateLocalBusinessHours();

  // Generate time slots for business hours in local timezone (or full day if useFullDayHours is true)
  const timeSlots: { hour: number; minute: number }[] = [];
  const startHour = useFullDayHours ? 0 : businessStartHour;
  const endHour = useFullDayHours ? 24 : businessEndHour;
  
  for (let hour = startHour; hour < endHour; hour++) {
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

    // Calculate position relative to business start hour (dynamic based on UK time or 0 if full day)
    const displayStartHour = useFullDayHours ? 0 : businessStartHour;
    const startOffset = (startHour - displayStartHour) * 2 + (startMinute >= 30 ? 1 : 0);
    const endOffset = (endHour - displayStartHour) * 2 + (endMinute >= 30 ? 1 : 0);
    const slots = endOffset - startOffset || 1;

    // Format time in 12-hour format with AM/PM
    const formatTime12Hour = (hour: number, minute: number) => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    return {
      top: startOffset * 30, // 30px per slot
      height: slots * 30,
      startTime: formatTime12Hour(startHour, startMinute),
      endTime: formatTime12Hour(endHour, endMinute),
    };
  };

  const formatWeekRange = () => {
    return formatDate(selectedDate);
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
          {/* <div className="time-column-header"></div>
          {weekDays.map((day, index) => (
            <div key={index} className={`day-column-header ${isToday(day) ? 'today-header' : ''}`}>
              <div className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="day-number">{day.getDate()}</div>
            </div>
          ))} */}
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
                        className={`flex gap-2 week-event ${eventClassName}`}
                        style={{
                          top: `${position.top}px`,
                          height: `${position.height}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                           onEventClick(event);
                        }}
                        title={`${position.startTime} - ${getEventName(event)}`}
                      >
                        <div className="event-name-compact">{position.startTime} -  {getEventName(event)}</div>
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
