import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart } from "@/components/charts/LineChart";

export default function LineChartPage() {
  return (
    <div className="space-y-6">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <LineChart />
        </CardContent>
      </Card>
    </div>
  );
}
