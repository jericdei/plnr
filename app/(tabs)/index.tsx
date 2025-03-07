import Button from "@/components/button/button";
import { colors } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { Text, SafeAreaView, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-8 flex-row items-center justify-between">
        <Text className="font-bold text-4xl">plnr</Text>

        <Button color="transparent" size="extraSmall">
          <Ionicons
            name="person-circle"
            size={48}
            color={colors.indigo["700"]}
          />
        </Button>
      </View>
    </SafeAreaView>
  );
}
