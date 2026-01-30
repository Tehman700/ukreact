import React from 'react';

type TimeSlotGridProps = {
  date: Date | null;
  generateTimeSlots: (date: Date) => string[];
  isSlotBooked: (date: Date, timeSlot: string) => boolean;
  selectedSlot: string | null;
  onSelectSlot: (timeSlot: string) => void;
};

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  date,
  generateTimeSlots,
  isSlotBooked,
  selectedSlot,
  onSelectSlot,
}) => {
  if (!date) return null;

  const formatEndTime = (slot: string, baseDate: Date) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const endTime = new Date(baseDate);
    endTime.setHours(hours, minutes + 30, 0, 0);
    const endHours = endTime.getHours().toString().padStart(2, '0');
    const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
    return `${endHours}:${endMinutes}`;
  };

  return (
    <div className="grid gap-2">
      <div className="text-sm font-medium">
        Date:{' '}
        {date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
      <div className="text-sm font-medium">Select Time Slot (30 minutes)</div>
      <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto border rounded-md p-3">
        {generateTimeSlots(date).map((slot) => {
          const booked = isSlotBooked(date, slot);
          return (
            <button
              key={slot}
              type="button"
              disabled={booked}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                booked
                  ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : selectedSlot === slot
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-accent'
              }`}
              onClick={() => {
                if (!booked) onSelectSlot(slot);
              }}
              title={booked ? 'This time slot is already booked' : `Select ${slot}`}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {selectedSlot && (
        <div className="text-xs text-muted-foreground mt-2">
          Selected: {selectedSlot} - {formatEndTime(selectedSlot, date)}
        </div>
      )}
    </div>
  );
};

