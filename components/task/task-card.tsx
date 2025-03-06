import { Task, tasks } from "@/db/schema";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Button from "../button/button";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "@/hooks/task";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { colors } from "@/utils/tailwind";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  startOfDay,
} from "date-fns";
import { router } from "expo-router";
import { parseUrl } from "@/utils/url";
import { ModalParams } from "@/types/params";
import { cn } from "@/utils/cn";

interface TaskCardProps {
  task: Task;
}

const HOUR_HEIGHT = 80;
const MINUTES_IN_DAY = 1440;

export default function TaskCard({ task }: TaskCardProps) {
  const queryClient = useQueryClient();

  const [isChecked, setChecked] = useState(!!task.isDone);

  const invalidateTasksQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey: [TASKS_QUERY_KEY],
    });
  };

  const handleCheckboxChange = async (value: boolean) => {
    try {
      await db
        .update(tasks)
        .set({
          isDone: value,
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, task.id))
        .execute();

      await invalidateTasksQuery();
    } catch (err) {
      console.error("ERRORRR >>> ", err);
    } finally {
      setChecked(value);
    }
  };

  const handleDelete = async () => {
    Alert.alert("Confirmation", "Are you sure you want to delete this task?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await db.delete(tasks).where(eq(tasks.id, task.id)).execute();
          await invalidateTasksQuery();
        },
      },
    ]);
  };

  const today = startOfDay(task.from);
  const startMinutes = differenceInMinutes(task.from, today);
  const durationMinutes = differenceInMinutes(task.to, task.from);
  const top = (startMinutes / MINUTES_IN_DAY) * (24 * HOUR_HEIGHT);
  const height = (durationMinutes / MINUTES_IN_DAY) * (24 * HOUR_HEIGHT);

  const twoLines = durationMinutes > 30;

  return (
    <TouchableOpacity
      className="absolute left-1 right-1 bg-indigo-200 rounded p-2 flex flex-col items-center justify-between border border-indigo-300"
      style={{
        top,
        height,
      }}
      onPress={() =>
        router.push(
          parseUrl<ModalParams>("/modal", {
            id: task.id.toString(),
            day: new Date(task.from).getDate().toString(),
            weekId: task.weekId,
          })
        )
      }
    >
      <View className="flex-row justify-between w-full">
        <View
          className={cn(
            "flex-row items-center gap-4",
            twoLines && "flex-col items-start gap-0"
          )}
        >
          <Text className="font-bold max-w-[15rem]" numberOfLines={1}>
            {task.title}
          </Text>

          <Text>{`${format(task.from, "h:mm a")} - ${format(
            task.to,
            "h:mm a"
          )}`}</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Checkbox
            color={colors.indigo[400]}
            value={isChecked}
            onValueChange={handleCheckboxChange}
          />

          <Button
            onPress={handleDelete}
            color="transparent"
            size="extraSmall"
            className="aspect-square rounded-full"
            textClassName="size-6"
          >
            <Ionicons name="trash" size={24} color="red" />
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}
