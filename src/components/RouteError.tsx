import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function RouteError() {
  const { t } = useTranslation();
  const error = useRouteError();

  let message = t("Something went wrong while loading this page.");
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <AlertTriangle className="h-10 w-10 text-destructive" aria-hidden="true" />
      <h1 className="text-xl font-semibold">{t("Page failed to load")}</h1>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <Button asChild>
        <Link to="/">{t("Back to Dashboard")}</Link>
      </Button>
    </div>
  );
}
