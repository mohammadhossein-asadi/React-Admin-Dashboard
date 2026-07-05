import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "@/components/charts/BarChart";

export default function BarChartPage() {
  return (
    <div className="space-y-6">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <BarChart />
        </CardContent>
      </Card>
    </div>
  );
}
