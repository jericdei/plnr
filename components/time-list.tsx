import { View, Text } from "react-native";
import React from "react";
import { generateTimeSlots } from "@/utils/time";
import { format } from "date-fns";

export default function TimeList() {
  const timeSlots = generateTimeSlots();

  return (
    <View className="w-14 border-r">
      {timeSlots.map((time) => (
        <Text
          key={time.toLocaleTimeString()}
          className="h-[60px] justify-center items-center border-b border-gray-300"
        >
          {format(time, "HH:mm")}
        </Text>
      ))}
    </View>
  );
}
