import Button from "@/components/button/button";
import ModalStatusBar from "@/components/modal-status-bar";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/validations/taskSchema";
import { router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFormInput from "@/components/form/text-form-input";
import TimeFormInput from "@/components/form/time-form-input";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "@/hooks/task";
import { formatTimestamp } from "@/utils/time";
import { createTask } from "@/services/task.service";

export default function ModalScreen() {
  const { weekId, day } = useLocalSearchParams<{
    weekId: string;
    day: string;
  }>();

  const queryClient = useQueryClient();

  const today = new Date();

  const { control, handleSubmit, setError } = useForm<TaskSchema>({
    defaultValues: {
      title: "",
      from: new Date(today.getFullYear(), today.getMonth(), parseInt(day)),
      to: new Date(today.getFullYear(), today.getMonth(), parseInt(day)),
      weekId,
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createTask(values);

      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY, weekId],
      });

      router.dismiss();
    } catch (err) {
      if (err instanceof Error) {
        setError("from", {
          message: err.message,
        });
      }
    }
  });

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ModalStatusBar />

      <Text className="text-xl font-bold">Add Task</Text>

      <View className="mt-16 w-full px-8 flex flex-col gap-8">
        <TextFormInput name="title" control={control} placeholder="Title" />

        <View className="flex flex-row justify-between">
          <TimeFormInput
            className="w-1/2"
            name="from"
            control={control}
            label="Start"
          />
          <TimeFormInput
            className="w-1/2"
            name="to"
            control={control}
            label="End"
          />
        </View>

        <Button onPress={onSubmit}>Submit</Button>
      </View>
    </View>
  );
}
