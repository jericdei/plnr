import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import WeekToggleHeader from "@/components/week-toggle-header";
import Button from "@/components/button/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGetTasksQuery } from "@/hooks/task";
import { useCurrentWeek } from "@/providers/week";
import TaskCard from "@/components/task/task-card";
import { generateTimeSlots } from "@/utils/time";
import { differenceInHours, format, formatDistance } from "date-fns";

export default function Index() {
  const { week } = useCurrentWeek();
  const { data: tasks = [], refetch } = useGetTasksQuery({ weekId: week.id });
  const timeSlots = generateTimeSlots();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <WeekToggleHeader onWeekChange={() => refetch()} />

      <View className="flex-1 mt-16 px-4">
        <ScrollView>
          <View className="flex-row">
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

            <View className="flex-1 relative">
              {tasks.length > 0 &&
                tasks.map((task) => {
                  return <TaskCard key={task.id} task={task} />;
                })}
            </View>
          </View>
        </ScrollView>
      </View>

      <View>
        <Button
          className="w-16 rounded-full aspect-square mx-auto"
          onPress={() => router.push(`/modal?weekId=${week.id}`)}
        >
          <Ionicons name="add" size={24} />
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
