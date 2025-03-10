import { ProfileSchema } from "@/validations/profileSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PROFILE_STORAGE_KEY = "profile";

export async function upsertProfile(values: ProfileSchema) {
  const data = {
    ...values,
  };

  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
}

export async function getProfile() {
  const data = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

  if (!data) {
    return undefined;
  }

  return JSON.parse(data) as ProfileSchema;
}
