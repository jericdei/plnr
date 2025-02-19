export default function getTimes() {
  const times = [];

  for (let hour = 4; hour <= 22; hour++) {
    const getTimeWithPeriod = (hour: number, minute: number) => {
      const period = hour < 12 ? "AM" : "PM";
      const standardHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedMinute = String(minute).padStart(2, "0");
      return `${standardHour}:${formattedMinute} ${period}`;
    };

    times.push(getTimeWithPeriod(hour, 0));
    if (hour !== 22) {
      // Avoid adding an extra interval past 10:00 PM
      times.push(getTimeWithPeriod(hour, 30));
    }
  }

  return times;
}
