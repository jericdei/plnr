import { createContext, useContext, useState, useEffect } from "react";
import { subDays, addDays, startOfWeek, format, isSameDay } from "date-fns";

export const WEEK_STARTS_ON = 1; // Monday

export type Week = {
  id: string;
  year: number;
  days: {
    date: Date;
    isToday: boolean;
  }[];
  start: string;
  end: string;
};

export type SetDay = React.Dispatch<React.SetStateAction<Date>>;

const CurrentWeekContext = createContext<{
  week: Week;
  day: Date;
  setDay: SetDay;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
} | null>(null);

export const getWeekRange = (today: Date): Week => {
  const weekStart = startOfWeek(today, {
    weekStartsOn: WEEK_STARTS_ON,
  });

  const weekEnd = addDays(weekStart, 6);
  const year = weekStart.getFullYear();

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      date,
      isToday: format(date, "MMdd") === format(today, "MMdd"),
    };
  });

  return {
    id: `${year}-${format(weekStart, "MMdd")}-${format(weekEnd, "MMdd")}`,
    year,
    days,
    start: format(weekStart, "MMM d"),
    end: format(weekEnd, "MMM d"),
  };
};

export function CurrentWeekProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [day, setDay] = useState(new Date());
  const [week, setWeek] = useState<Week>(getWeekRange(new Date()));

  const handlePreviousWeek = () => setDay((prev) => subDays(prev, 7));
  const handleNextWeek = () => setDay((prev) => addDays(prev, 7));

  useEffect(() => {
    setWeek(getWeekRange(day));
  }, [day]);

  return (
    <CurrentWeekContext.Provider
      value={{ week, day, setDay, handlePreviousWeek, handleNextWeek }}
    >
      {children}
    </CurrentWeekContext.Provider>
  );
}

export function useCurrentWeek() {
  const context = useContext(CurrentWeekContext);

  if (!context) {
    throw new Error("useCurrentWeek must be used within a CurrentWeekProvider");
  }

  return context;
}
