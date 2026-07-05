import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { GeographyChart } from "@/components/charts/GeographyChart";

export default function GeographyPage() {
  return (
    <div className="space-y-6">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Card>
        <CardContent className="h-[75vh] pt-6">
          <GeographyChart />
        </CardContent>
      </Card>
    </div>
  );
}
