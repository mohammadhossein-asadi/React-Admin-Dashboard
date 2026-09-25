import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSettings, type NotificationPrefs } from "@/contexts/settings-context";
import { Toggle } from "./Toggle";

const ITEMS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  {
    key: "emailNotifications",
    label: "Email Notifications",
    description: "Receive notifications about activity via email",
  },
  {
    key: "pushNotifications",
    label: "Push Notifications",
    description: "Receive push notifications in your browser",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    description: "Receive emails about new features and updates",
  },
  {
    key: "weeklyDigest",
    label: "Weekly Digest",
    description: "Receive a weekly summary of your dashboard activity",
  },
];

export function NotificationsTab() {
  const { t } = useTranslation();
  const { notifications, setNotificationPref } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Notifications")}</CardTitle>
        <CardDescription>{t("Control what notifications you receive.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ITEMS.map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{t(item.label)}</p>
              <p className="text-sm text-muted-foreground">{t(item.description)}</p>
            </div>
            <Toggle
              checked={notifications[item.key]}
              onChange={(value) => setNotificationPref(item.key, value)}
              label={t(item.label)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
