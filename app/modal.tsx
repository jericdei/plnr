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

export default function ModalScreen() {
  const { weekId } = useLocalSearchParams<{ weekId: string }>();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<TaskSchema>({
    defaultValues: {
      title: "",
      from: new Date(),
      to: new Date(),
      weekId,
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await db.insert(tasks).values(values).execute();

      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY, weekId],
      });

      router.dismiss();
    } catch (err) {
      console.error("ERRORRR >>> ", err);
    }
  });

  return (
    <View className="flex-1 items-center justify-center">
      <ModalStatusBar />

      <Text className="text-xl font-bold">Add Task</Text>

      <View className="mt-16 w-full px-8 flex flex-col gap-8">
        <TextFormInput name="title" control={control} placeholder="Title" />
        <View className="flex flex-row justify-between">
          <TimeFormInput name="from" control={control} label="Start" />
          <TimeFormInput name="to" control={control} label="End" />
        </View>

        <Button onPress={onSubmit}>Submit</Button>
      </View>
    </View>
  );
}

function InputContainer({ children }: { children: React.ReactNode }) {
  return <View className="flex flex-row items-center gap-4">{children}</View>;
}
