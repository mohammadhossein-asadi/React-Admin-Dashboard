import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, type User } from "@/contexts/auth-context";
import { ProfileTab } from "@/pages/settings/ProfileTab";
import { AccountTab } from "@/pages/settings/AccountTab";
import { AppearanceTab } from "@/pages/settings/AppearanceTab";
import { NotificationsTab } from "@/pages/settings/NotificationsTab";
import { SecurityTab } from "@/pages/settings/SecurityTab";
import { Save, User as UserIcon, Palette, Bell, Shield, Mail } from "lucide-react";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User>(user);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isDirty =
    profile.firstName !== user.firstName ||
    profile.lastName !== user.lastName ||
    profile.email !== user.email ||
    profile.bio !== user.bio ||
    profile.avatarUrl !== user.avatarUrl;

  const handleSave = () => {
    updateUser(profile);
    setSaved(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 min-w-0">
      <PageHeader
        subtitle={t("Manage your account settings")}
        actions={
          <Button onClick={handleSave} disabled={!isDirty && !saved}>
            <Save className="mr-2 h-4 w-4" aria-hidden="true" />
            {saved ? t("Saved!") : t("Save Changes")}
          </Button>
        }
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <UserIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Profile")}
          </TabsTrigger>
          <TabsTrigger value="account">
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Account")}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Appearance")}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Notifications")}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Security")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab profile={profile} onProfileChange={setProfile} />
        </TabsContent>
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
