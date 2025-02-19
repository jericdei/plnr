import { addHours, startOfDay } from "date-fns";

export function generateTimeSlots() {
  const today = startOfDay(new Date());

  return Array.from({ length: 24 }, (_, i) => addHours(today, i));
}
