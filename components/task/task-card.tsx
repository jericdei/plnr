import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TaskListCardProps } from "./task-list-card";
import { format } from "date-fns";

export default function TaskCard({ task }: TaskListCardProps) {
  return (
    <TouchableOpacity className="p-4 rounded-2xl bg-indigo-200">
      <Text className="font-bold text-xl">{task.title}</Text>

      <Text>{`${format(task.from, "h:mm a")} - ${format(
        task.to,
        "h:mm a"
      )}`}</Text>
    </TouchableOpacity>
  );
}
