import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export function LoadingState({ rows = 5 }: { rows?: number }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3" role="status" aria-label={t("Loading data")}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} role="presentation" className="h-12 animate-pulse rounded-md bg-muted" />
      ))}
      <span className="sr-only">{t("Loading data...")}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-8 text-center"
      role="alert"
    >
      <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <p className="text-sm font-medium">{t("Failed to load data")}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
        {t("Try again")}
      </Button>
    </div>
  );
}
