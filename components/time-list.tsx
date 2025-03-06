import { View, Text } from "react-native";
import React from "react";
import { generateTimeSlots } from "@/utils/time";
import { format } from "date-fns";

export default function TimeList() {
  const timeSlots = generateTimeSlots();

  return (
    <View className="w-14 border-r border-gray-300">
      {timeSlots.map((time) => (
        <View
          className="h-[60px] border-y border-gray-300"
          key={time.toLocaleTimeString()}
        >
          <Text className="top-1/3 left-1">{format(time, "HH:mm")}</Text>
        </View>
      ))}
    </View>
  );
}
