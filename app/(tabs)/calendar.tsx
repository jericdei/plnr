import { SafeAreaView, Text, View } from "react-native";
import WeekToggleHeader from "@/components/week-toggle-header";
import Button from "@/components/button/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetTasksQuery } from "@/hooks/task";
import { useCurrentWeek } from "@/providers/week";
import DayToggleHeader from "@/components/day-toggle-header";
import { parseUrl } from "@/utils/url";
import { ModalParams } from "@/types/params";
import TaskScrollView from "@/components/task/task-scroll-view";

export default function Index() {
  const { week, day, setDay } = useCurrentWeek();

  const { data: tasks, refetch } = useGetTasksQuery({
    weekId: week.id,
    day,
  });

  const completed = tasks?.filter((x) => x.isDone).length ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <WeekToggleHeader onWeekChange={() => refetch()} />
      <DayToggleHeader
        onDayChange={(val) => {
          setDay(val);
          refetch();
        }}
      />

      <View className="justify-center mt-4">
        <Text className="text-center font-bold">
          {completed} / {tasks?.length} tasks completed
        </Text>
      </View>

      <TaskScrollView tasks={tasks} />

      <Button
        className="w-16 rounded-full absolute aspect-square bottom-8 right-4"
        onPress={() =>
          router.push(
            parseUrl<ModalParams>("/task-form-modal", {
              day: day.getDate().toString(),
              weekId: week.id,
            })
          )
        }
      >
        <Ionicons name="add" size={24} />
      </Button>
    </SafeAreaView>
  );
}
