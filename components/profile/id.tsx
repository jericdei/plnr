import { View, Text, Image } from "react-native";
import React from "react";
import { useProfile } from "@/providers/profile";
import ProfilePhotoButton from "../button/profile-photo-button";
import { format } from "date-fns";

export default function ProfileId() {
  const { profile } = useProfile();

  return (
    <View className="rounded-lg border border-black p-3 flex-row bg-indigo-200 min-h-[16rem]">
      <View>
        <ProfilePhotoButton />
      </View>

      <View className="items-center flex-1">
        <Image source={{ uri: profile?.logoUri }} className="w-64 h-16" />

        <View className="flex-1 mt-4 w-full flex-row gap-2 px-2">
          <View className="flex-col gap-2">
            <ProfileEntry label="Name" value={profile?.name} />
            <ProfileEntry label="Course" value={profile?.course} />
            <ProfileEntry label="School" value={profile?.school} />
          </View>

          <View className="flex-col gap-2">
            <ProfileEntry
              label="Birthday"
              value={
                profile?.birthday && format(profile.birthday, "MM-dd-yyyy")
              }
            />
            <ProfileEntry label="Year Level" value={profile?.yearLevel} />
          </View>
        </View>
      </View>
    </View>
  );
}

function ProfileEntry({ label, value }: { label: string; value?: string }) {
  return (
    <View className="flex-col gap-2">
      <Text className="uppercase text-xs">{label}</Text>
      <Text className="font-bold">{value}</Text>
    </View>
  );
}
