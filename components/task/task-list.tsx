import { View } from "react-native";
import React from "react";
import TaskCard from "@/components/task/task-card";
import { Task } from "@/db/schema";

interface TaskListProps {
  tasks?: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className="flex-1 relative">
      {tasks?.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </View>
  );
}
