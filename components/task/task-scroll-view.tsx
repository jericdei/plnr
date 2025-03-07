import { Task } from "@/db/schema";
import { useSwipe } from "@/hooks/swipe";
import { useCurrentWeek } from "@/providers/week";
import { addDays, subDays } from "date-fns";
import { View, ScrollView } from "react-native";
import TimeList from "../time-list";
import TaskList from "./task-list";

interface TaskScrollViewProps {
  tasks?: Task[];
}

export default function TaskScrollView({ tasks }: TaskScrollViewProps) {
  const { day, setDay } = useCurrentWeek();

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  function onSwipeLeft() {
    setDay(addDays(day, 1));
  }

  function onSwipeRight() {
    setDay(subDays(day, 1));
  }

  return (
    <View className="flex-1 mt-4 px-4">
      <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <View className="flex-row">
          <TimeList />
          <TaskList tasks={tasks} />
        </View>
      </ScrollView>
    </View>
  );
}
