import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "@/components/charts/PieChart";

export default function PieChartPage() {
  return (
    <div className="space-y-6">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <PieChart />
        </CardContent>
      </Card>
    </div>
  );
}
