import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type MonthDayCell<TEvent> = {
  showPanel?: boolean;
  date: Date | null;
  events: TEvent[];
};

type MonthGridProps<TEvent> = {
  currentDate: Date;
  formatMonthYear: (date: Date) => string;
  days: MonthDayCell<TEvent>[];
  isToday: (date: Date) => boolean;
  isSelected: (date: Date) => boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick: (date: Date) => void;
  renderDayEvents: (events: TEvent[], date: Date) => React.ReactNode;
  showPanel?: boolean;
};

export const MonthGrid = <TEvent,>({
  currentDate,
  formatMonthYear,
  days,
  isToday,
  isSelected,
  onPrevMonth,
  onNextMonth,
  onDayClick,
  renderDayEvents,
  showPanel = true,
}: MonthGridProps<TEvent>) => {
  return (
    <div className={`calendar-section ${!showPanel ? 'calendar-section-full' : ''}`}>
      <div className="month-navigation">
        <button onClick={onPrevMonth}>
          <ChevronLeft />
        </button>
        <h2>{formatMonthYear(currentDate)}</h2>
        <button onClick={onNextMonth}>
          <ChevronRight />
        </button>
      </div>

      <div className="weekday-headers">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="days-grid">
        {days.map((cell, i) =>
          cell.date ? (
            <button
              key={i}
              className={`day-cell ${isToday(cell.date) ? 'today' : ''} ${isSelected(cell.date) ? 'selected' : ''}`}
              onClick={() => onDayClick(cell.date!)}
            >
              <span className="day-number">{cell.date.getDate()}</span>
              {renderDayEvents(cell.events, cell.date)}
            </button>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
};

