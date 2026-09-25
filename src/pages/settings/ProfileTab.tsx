import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, type User } from "@/contexts/auth-context";

interface ProfileTabProps {
  profile: User;
  onProfileChange: (profile: User) => void;
}

export function ProfileTab({ profile, onProfileChange }: ProfileTabProps) {
  const { t } = useTranslation();
  const { updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError(t("File is too large. Max size is 2MB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const avatarUrl = String(reader.result);
      onProfileChange({ ...profile, avatarUrl });
      updateUser({ avatarUrl });
      setAvatarError(null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Profile")}</CardTitle>
        <CardDescription>{t("Update your personal information and avatar.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            {profile.avatarUrl && <AvatarImage src={profile.avatarUrl} alt="" />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              className="sr-only"
              aria-label={t("Choose avatar image")}
              onChange={handleAvatarChange}
            />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              {t("Change Avatar")}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              {avatarError ?? t("JPG, PNG or GIF. Max size 2MB.")}
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("First Name")}</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => onProfileChange({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t("Last Name")}</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => onProfileChange({ ...profile, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("Email")}</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onProfileChange({ ...profile, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">{t("Bio")}</Label>
          <Input
            id="bio"
            value={profile.bio}
            onChange={(e) => onProfileChange({ ...profile, bio: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
