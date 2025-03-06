import { TIMESTAMP_FORMAT } from "@/constants/time";
import { addHours, format, startOfDay } from "date-fns";

export function generateTimeSlots() {
  const today = startOfDay(new Date());

  return Array.from({ length: 24 }, (_, i) => addHours(today, i));
}

export function formatTimestamp(date: Date) {
  return format(date, TIMESTAMP_FORMAT);
}
