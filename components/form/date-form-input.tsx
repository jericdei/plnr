import { Text, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { cn } from "@/utils/cn";

interface DateFormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  className?: string;
}

export default function DateFormInput<T extends FieldValues>({
  name,
  control,
  label,
  className,
}: DateFormInputProps<T>) {
  return (
    <View className={cn(className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="flex-col gap-3">
            <View className="flex-row items-center gap-4">
              <Text className="text-lg font-bold">{label}</Text>

              <DateTimePicker
                value={value ?? new Date()}
                mode="date"
                themeVariant="light"
                onChange={(_, selectedDate) => {
                  onChange(selectedDate);
                }}
              />
            </View>

            {error && <Text className="text-red-400">{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}
