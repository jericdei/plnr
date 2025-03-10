import { View } from "react-native";
import React from "react";
import TaskListCard from "@/components/task/task-list-card";
import { Task } from "@/db/schema";

interface TaskListProps {
  tasks?: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View className="flex-1 relative">
      {tasks?.map((task) => {
        return <TaskListCard key={task.id} task={task} />;
      })}
    </View>
  );
}
