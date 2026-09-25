import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardContent className="space-y-4 pt-6">
          <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">{t("Page Not Found")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("The page you are looking for does not exist or has been moved.")}
          </p>
          <Button asChild>
            <Link to="/">{t("Back to Dashboard")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
