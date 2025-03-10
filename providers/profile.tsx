import { getProfile } from "@/services/profile.service";
import { ProfileSchema } from "@/validations/profileSchema";
import { createContext, useContext, useEffect, useState } from "react";

export type SetProfile = React.Dispatch<
  React.SetStateAction<ProfileSchema | undefined>
>;

const ProfileContext = createContext<{
  profile?: ProfileSchema;
  setProfile: SetProfile;
} | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileSchema>();

  useEffect(() => {
    if (!profile) {
      getProfile().then((data) => setProfile(data));
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
}
