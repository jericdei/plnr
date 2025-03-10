import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import ProfileId from "@/components/profile/id";
import TextFormInput from "@/components/form/text-form-input";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileSchema } from "@/validations/profileSchema";
import { useProfile } from "@/providers/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import DateFormInput from "@/components/form/date-form-input";
import { upsertProfile } from "@/services/profile.service";
import Button from "@/components/button/button";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function EditProfileScreen() {
  const { profile, setProfile } = useProfile();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<ProfileSchema>({
    values: profile,
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={onSubmit}>Save</Button>,
    });
  }, [navigation]);

  const onSubmit = handleSubmit(async (data) => {
    const values = { ...profile, ...data };

    await upsertProfile(values);
    setProfile(values);

    router.back();
  });

  const handleUploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const logoUri = result.assets[0].uri;

      await upsertProfile({
        logoUri,
      });

      setProfile({ ...profile, logoUri });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="p-4 flex-1 bg-white"
    >
      <SafeAreaView className="">
        <ProfileId />

        <ScrollView className="mt-16 max-h-[38rem]">
          <View className="flex flex-col gap-8">
            <TextFormInput
              control={control}
              name="name"
              label="Name"
              placeholder="Ex. Jane Doe"
            />

            <DateFormInput control={control} name="birthday" label="Birthday" />

            <TextFormInput
              control={control}
              name="school"
              label="School"
              placeholder="Ex. Universidad de Manila"
            />

            <View className="flex-col gap-4">
              <Text className="font-bold text-lg">Logo</Text>
              <TouchableOpacity onPress={handleUploadPhoto}>
                {profile?.logoUri ? (
                  <Image
                    source={{ uri: profile.logoUri }}
                    className="h-48 w-full"
                    alt="profile"
                  />
                ) : (
                  <View className="h-24 rounded-lg border border-dashed w-full justify-center items-center">
                    <Text>No photo selected. Tap to choose.</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <TextFormInput
              control={control}
              name="course"
              label="Course"
              placeholder="Ex. Bachelor of Science in Accountancy"
            />

            <TextFormInput
              control={control}
              name="yearLevel"
              label="Year Level"
              placeholder="Ex. 4th year"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
