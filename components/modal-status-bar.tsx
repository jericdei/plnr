import { Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function ModalStatusBar() {
  return <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />;
}
