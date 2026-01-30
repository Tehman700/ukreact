import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
type CalendarHeaderProps = {
  title?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  title = 'Calendar',
  subtitle,
  rightContent,
}) => {
  return (
    <div className="calendar-header">
      <div className="header-content">
        <div className="header-left">
          <CalendarIcon className="header-icon" />
          <div>
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        </div>
        {rightContent && <div className="header-right flex gap-2">{rightContent}</div>}
      </div>
    </div>
  );
};

