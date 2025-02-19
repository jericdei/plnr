import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/button/button";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentWeek } from "@/providers/week";

interface WeekToggleHeaderProps {
  onWeekChange: () => void;
}

export default function WeekToggleHeader({
  onWeekChange,
}: WeekToggleHeaderProps) {
  const { week, handlePreviousWeek, handleNextWeek } = useCurrentWeek();

  const handleWeekChange = (cb: () => void) => {
    onWeekChange();
    cb();
  };

  return (
    <View className="flex flex-row items-center justify-around w-full px-4 mt-4">
      <Button onPress={() => handleWeekChange(handlePreviousWeek)}>
        <Ionicons name="chevron-back" size={24} />
      </Button>

      <View className="flex-1 flex flex-col items-center">
        <Text className="text-sm">{week.year}</Text>
        <Text className="font-bold text-xl">
          {week.start} - {week.end}
        </Text>
      </View>

      <Button onPress={() => handleWeekChange(handleNextWeek)}>
        <Ionicons name="chevron-forward" size={24} />
      </Button>
    </View>
  );
}
