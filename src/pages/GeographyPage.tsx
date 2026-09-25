import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { GeographyChart } from "@/components/charts/GeographyChart";

export default function GeographyPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <Header subtitle={t("Simple Geography Chart")} />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <GeographyChart />
        </CardContent>
      </Card>
    </div>
  );
}
