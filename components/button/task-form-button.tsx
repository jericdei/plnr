import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/button/button";
import { Link, router } from "expo-router";
import { parseUrl } from "@/utils/url";
import { ModalParams } from "@/types/params";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentWeek } from "@/providers/week";

export default function TaskFormButton() {
  const { day, week } = useCurrentWeek();

  return (
    <Button
      className="w-16 rounded-full absolute aspect-square left-1/2 -translate-x-1/2 bottom-32 right-4"
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
  );
}
