import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";
import { tv } from "tailwind-variants";

const button = tv({
  base: "rounded-md px-4 py-2 flex items-center flex-col justify-center",
  variants: {
    color: {
      primary: ["bg-indigo-400", "border-transparent"],
      secondary: ["bg-white", "border-gray-400"],
      danger: ["bg-red-400", "border-transparent"],
      transparent: ["bg-transparent"],
    },
    size: {
      small: ["py-1", "px-2"],
      medium: ["py-2", "px-4"],
    },
    text: {
      base: "text-center font-semibold",
      primary: "text-white",
      secondary: "text-gray-800",
      danger: "text-white",
      transparent: "",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "medium",
  },
});

export type ButtonColors = keyof typeof button.variants.color;
export type ButtonSizes = keyof typeof button.variants.size;

export interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
  color?: ButtonColors;
  size?: ButtonSizes;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  color = "primary",
  size = "medium",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity className={button({ color, size, className })} {...props}>
      <Text
        className={cn(button.variants.text.base, button.variants.text[color])}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
