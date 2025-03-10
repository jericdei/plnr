import { View, Text, Image } from "react-native";
import Button from "@/components/button/button";
import { useProfile } from "@/providers/profile";
import * as ImagePicker from "expo-image-picker";
import { upsertProfile } from "@/services/profile.service";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/tailwind";

export default function ProfilePhotoButton() {
  const { profile, setProfile } = useProfile();

  const handleUploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;

      await upsertProfile({
        photoUri: photoUri,
      });

      setProfile({ ...profile, photoUri });
    }
  };

  return (
    <Button color="transparent" size="extraSmall" onPress={handleUploadPhoto}>
      {profile?.photoUri ? (
        <Image
          source={{ uri: profile?.photoUri }}
          className="h-48 w-40 border"
        />
      ) : (
        <Ionicons name="person" size={48} color={colors.indigo["400"]} />
      )}
    </Button>
  );
}
