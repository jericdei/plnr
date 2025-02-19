import { createContext, useContext, useState, useEffect } from "react";
import { subDays, addDays, startOfWeek, format } from "date-fns";

export const WEEK_STARTS_ON = 1; // Monday

export type Week = {
  id: string;
  year: number;
  start: string;
  end: string;
};

const CurrentWeekContext = createContext<{
  week: Week;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
} | null>(null);

export const getWeekRange = (today: Date): Week => {
  const weekStart = startOfWeek(today, {
    weekStartsOn: WEEK_STARTS_ON,
  });

  const weekEnd = addDays(weekStart, 6);
  const year = weekStart.getFullYear();

  return {
    id: `${year}-${format(weekStart, "MMdd")}-${format(weekEnd, "MMdd")}`,
    year,
    start: format(weekStart, "MMM d"),
    end: format(weekEnd, "MMM d"),
  };
};

export function CurrentWeekProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [today, setToday] = useState(new Date());
  const [week, setWeek] = useState<Week>(getWeekRange(new Date()));

  const handlePreviousWeek = () => setToday((prev) => subDays(prev, 7));
  const handleNextWeek = () => setToday((prev) => addDays(prev, 7));

  useEffect(() => {
    setWeek(getWeekRange(today));
  }, [today]);

  return (
    <CurrentWeekContext.Provider
      value={{ week, handlePreviousWeek, handleNextWeek }}
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
