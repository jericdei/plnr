import ProfilePhotoButton from "@/components/button/profile-photo-button";
import ProfileId from "@/components/profile/id";
import TaskCard from "@/components/task/task-card";
import { useGetUpcomingTaskQuery } from "@/hooks/task";
import { router } from "expo-router";
import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";

export default function Index() {
  const { data: upcomingTask } = useGetUpcomingTaskQuery();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-8">
          <Text className="font-bold text-4xl">plnr</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/profile/edit")}>
          <ProfileId />
        </TouchableOpacity>

        <View className="mt-8">
          <Text className="text-lg font-bold mb-4">Upcoming Task</Text>

          {upcomingTask ? (
            <TaskCard task={upcomingTask} />
          ) : (
            <Text>You have no upcoming task today. Cheers!</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
