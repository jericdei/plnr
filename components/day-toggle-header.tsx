import { Text, View } from "react-native";
import React from "react";
import { SetDay, useCurrentWeek } from "@/providers/week";
import Button from "./button/button";
import { format, isSameDay } from "date-fns";

interface WeekToggleHeaderProps {
  onDayChange: (day: Date) => void;
}

export default function DayToggleHeader({
  onDayChange,
}: WeekToggleHeaderProps) {
  const { week, day: selected, setDay: setSelected } = useCurrentWeek();

  const handleDayChange = (date: Date) => {
    setSelected(date);
    onDayChange(date);
  };

  return (
    <View className="flex-row items-center justify-around w-full px-4 mt-4">
      {week.days.map((day) => (
        <View
          key={day.date.toISOString()}
          className="flex flex-col items-center gap-2"
        >
          <Text className="text-sm">{format(day.date, "E")}</Text>
          <Button
            className="rounded-full aspect-square size-14"
            color={isSameDay(day.date, selected) ? "primary" : "secondary"}
            onPress={() => handleDayChange(day.date)}
          >
            {day.date.getDate()}
          </Button>
        </View>
      ))}
    </View>
  );
}
