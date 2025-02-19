import { Text, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ComponentProps } from "react";

interface TimeFormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export default function TimeFormInput<T extends FieldValues>({
  name,
  control,
  label,
}: TimeFormInputProps<T>) {
  return (
    <View className="flex flex-row items-center gap-4">
      <Text className="text-lg font-bold">{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            value={value ?? new Date()}
            mode="time"
            minuteInterval={30}
            onChange={(_, selectedDate) => {
              onChange(selectedDate);
            }}
          />
        )}
      />
    </View>
  );
}
