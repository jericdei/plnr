import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextFormInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
}

export default function TextFormInput<T extends FieldValues>({
  name,
  control,
  ...props
}: TextFormInputProps<T>) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-gray-400 p-4 rounded-lg"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          />
        )}
      />
    </View>
  );
}
