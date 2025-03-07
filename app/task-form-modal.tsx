import Button from "@/components/button/button";
import ModalStatusBar from "@/components/modal-status-bar";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/validations/taskSchema";
import { router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFormInput from "@/components/form/text-form-input";
import TimeFormInput from "@/components/form/time-form-input";
import { useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY, useGetTaskQuery } from "@/hooks/task";
import { upsertTask } from "@/services/task.service";
import { ModalParams } from "@/types/params";

const today = new Date();

function format(day: string, date?: string) {
  if (!date) {
    return new Date(today.getFullYear(), today.getMonth(), parseInt(day));
  }

  return new Date(date);
}

export default function TaskFormModalScreen() {
  const { weekId, day, id } = useLocalSearchParams<ModalParams>();
  const queryClient = useQueryClient();

  const { data: task } = useGetTaskQuery(id);

  const { control, handleSubmit, setError } = useForm<TaskSchema>({
    values: {
      title: task?.title ?? "",
      from: format(day, task?.from),
      to: format(day, task?.to),
      weekId,
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await upsertTask(values, id);

      await queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY, weekId, parseInt(day)],
        exact: true,
      });

      router.dismiss();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError("from", {
          message: err.message,
        });
      }
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="items-center justify-center bg-white pt-8"
    >
      <ModalStatusBar />

      <Text className="text-xl font-bold">
        {id ? "Edit" : "Create New"} Task
      </Text>

      <View className="mt-8 w-full px-8 flex flex-col gap-8">
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
    </KeyboardAvoidingView>
  );
}
