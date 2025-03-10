import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/utils/cn";

interface TextFormInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export default function TextFormInput<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: TextFormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="flex-col gap-3">
          <Text className="text-lg font-bold">{label}</Text>
          <TextInput
            className={cn(
              "border border-gray-400 p-4 rounded-lg placeholder:text-gray-400",
              error && "border-red-400"
            )}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          />

          {error && <Text className="text-red-400">{error.message}</Text>}
        </View>
      )}
    />
  );
}
