import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTheme } from "@/contexts/theme-context";
import { useSettings, type AccentName } from "@/contexts/settings-context";
import { Toggle } from "./Toggle";
import { Sun, Moon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ACCENTS: { name: AccentName; label: string; className: string }[] = [
  { name: "green", label: "Green", className: "bg-success" },
  { name: "blue", label: "Blue", className: "bg-blue-500" },
  { name: "purple", label: "Purple", className: "bg-purple-500" },
  { name: "orange", label: "Orange", className: "bg-orange-500" },
  { name: "pink", label: "Pink", className: "bg-pink-500" },
];

export function AppearanceTab() {
  const { theme, toggleTheme } = useTheme();
  const { accent, setAccent, language, setLanguage } = useSettings();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Appearance")}</CardTitle>
        <CardDescription>{t("Customize the look and feel of your dashboard.")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
            <div>
              <p className="font-medium">{t("Dark Mode")}</p>
              <p className="text-sm text-muted-foreground">
                {theme === "dark" ? t("Dark theme is active") : t("Light theme is active")}
              </p>
            </div>
          </div>
          <Toggle checked={theme === "dark"} onChange={toggleTheme} label={t("Dark mode")} />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2">
              <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">{t("Language")}</p>
              <p className="text-sm text-muted-foreground">{t("Select your preferred language")}</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={t("Preferred language")}
            className="rounded-md border bg-background px-3 py-1.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
            <option value="ko">한국어</option>
            <option value="ar">العربية</option>
            <option value="fa">فارسی</option>
          </select>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-medium">{t("Accent Color")}</p>
          <p className="mb-4 text-sm text-muted-foreground">
            {t("Choose your primary accent color")}
          </p>
          <div className="flex gap-3" role="group" aria-label={t("Accent color")}>
            {ACCENTS.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                aria-label={t("{{label}} accent", { label: t(swatch.label) })}
                aria-pressed={accent === swatch.name}
                onClick={() => setAccent(swatch.name)}
                className={cn(
                  "h-8 w-8 rounded-full ring-2 ring-offset-2 transition-all hover:scale-110",
                  swatch.className,
                  accent === swatch.name ? "ring-foreground" : "ring-transparent"
                )}
                title={t(swatch.label)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
