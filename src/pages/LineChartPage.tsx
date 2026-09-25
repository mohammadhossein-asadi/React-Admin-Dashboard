import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart } from "@/components/charts/LineChart";

export default function LineChartPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <Header subtitle={t("Simple Line Chart")} />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <LineChart />
        </CardContent>
      </Card>
    </div>
  );
}
