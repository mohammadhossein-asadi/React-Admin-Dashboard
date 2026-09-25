import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/contexts/settings-context";
import { Toggle } from "./Toggle";

export function SecurityTab() {
  const { t } = useTranslation();
  const { twoFactorEnabled, setTwoFactorEnabled } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Security")}</CardTitle>
        <CardDescription>{t("Manage your security settings.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">{t("Two-Factor Authentication")}</p>
            <p className="text-sm text-muted-foreground">
              {t("Add an extra layer of security to your account")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                twoFactorEnabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              }`}
            >
              {twoFactorEnabled ? t("Enabled") : t("Disabled")}
            </span>
            <Toggle
              checked={twoFactorEnabled}
              onChange={setTwoFactorEnabled}
              label={t("Two-factor authentication")}
            />
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border p-4">
          <p className="font-medium">{t("Session")}</p>
          <p className="text-sm text-muted-foreground">
            {t("Sign out from the profile menu in the top bar to end your session.")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
