import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";

function InlineStatus({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-sm text-success" role="status">
      {message}
    </p>
  );
}

export function AccountTab() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [confirmEmail, setConfirmEmail] = useState(user.email);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUpdateEmail = () => {
    if (!email.trim()) {
      setEmailError(t("Email is required."));
      setEmailStatus(null);
      return;
    }
    if (email !== confirmEmail) {
      setEmailError(t("Email addresses do not match."));
      setEmailStatus(null);
      return;
    }
    setEmailError(null);
    updateUser({ email: email.trim() });
    setEmailStatus(t("Email updated."));
  };

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      setPasswordError(t("Current password is required."));
      setPasswordStatus(null);
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError(t("New password must be at least 8 characters."));
      setPasswordStatus(null);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t("Passwords do not match."));
      setPasswordStatus(null);
      return;
    }
    setPasswordError(null);
    setPasswordStatus(t("Password updated."));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Account")}</CardTitle>
        <CardDescription>{t("Manage your email and password settings.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="font-medium">{t("Email Address")}</p>
          <div className="space-y-2">
            <Label htmlFor="account-email">{t("Email")}</Label>
            <Input
              id="account-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-email-confirm">{t("Confirm Email")}</Label>
            <Input
              id="account-email-confirm"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>
          {emailError && (
            <p className="text-sm text-destructive" role="alert">
              {emailError}
            </p>
          )}
          <InlineStatus message={emailStatus} />
          <Button variant="outline" size="sm" onClick={handleUpdateEmail}>
            {t("Update Email")}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="font-medium">{t("Change Password")}</p>
          <div className="space-y-2">
            <Label htmlFor="account-current-password">{t("Current Password")}</Label>
            <Input
              id="account-current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-new-password">{t("New Password")}</Label>
            <Input
              id="account-new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-confirm-password">{t("Confirm New Password")}</Label>
            <Input
              id="account-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-destructive" role="alert">
              {passwordError}
            </p>
          )}
          <InlineStatus message={passwordStatus} />
          <Button variant="outline" size="sm" onClick={handleUpdatePassword}>
            {t("Update Password")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
