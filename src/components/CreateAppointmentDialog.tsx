import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { TimeSlotGrid } from './TimeSlotGrid';

type CreateAppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  error: string | null;
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  dateForCreate: Date | null;
  generateTimeSlots: (date: Date) => string[];
  isSlotBooked: (date: Date, timeSlot: string) => boolean;
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onCreate: () => void;
  onCancel: () => void;
  primaryLabel?: string;
};

export const CreateAppointmentDialog: React.FC<CreateAppointmentDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  error,
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  dateForCreate,
  generateTimeSlots,
  isSlotBooked,
  selectedSlot,
  onSelectSlot,
  onCreate,
  onCancel,
  primaryLabel = 'Create',
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description !== undefined && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="grid gap-4">
          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error}
            </p>
          )}

          <div className="grid gap-2">
            <div className="text-sm font-medium">Name</div>
            <input
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium">Email</div>
            <input
              type="email"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium">Phone</div>
            <input
              type="tel"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Phone number ex.+1234567890"
              required
            />
          </div>

          {dateForCreate && (
            <TimeSlotGrid
              date={dateForCreate}
              generateTimeSlots={generateTimeSlots}
              isSlotBooked={isSlotBooked}
              selectedSlot={selectedSlot}
              onSelectSlot={onSelectSlot}
            />
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button type="button" onClick={onCreate} className="cursor-pointer">
            {primaryLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

