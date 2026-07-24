import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { RadarChartComponent } from "@/components/charts/RadarChart";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { ScatterChartComponent } from "@/components/charts/ScatterChart";
import { StackedAreaChart } from "@/components/charts/StackedAreaChart";
import type { RadarDataItem, ScatterDataItem, StackedAreaDataItem } from "@/types";

const radarData: RadarDataItem[] = [
  { subject: "Frontend", A: 92, B: 85, fullMark: 100 },
  { subject: "Backend", A: 88, B: 90, fullMark: 100 },
  { subject: "DevOps", A: 78, B: 80, fullMark: 100 },
  { subject: "Design", A: 85, B: 75, fullMark: 100 },
  { subject: "Testing", A: 70, B: 82, fullMark: 100 },
  { subject: "Security", A: 82, B: 78, fullMark: 100 },
];

const scatterData1: ScatterDataItem[] = [
  { x: 100, y: 200, z: 160 },
  { x: 120, y: 180, z: 140 },
  { x: 170, y: 250, z: 200 },
  { x: 140, y: 220, z: 180 },
  { x: 160, y: 300, z: 250 },
  { x: 190, y: 280, z: 220 },
  { x: 200, y: 340, z: 280 },
  { x: 150, y: 260, z: 190 },
  { x: 180, y: 310, z: 240 },
  { x: 130, y: 190, z: 150 },
];

const scatterData2: ScatterDataItem[] = [
  { x: 110, y: 210, z: 130 },
  { x: 130, y: 170, z: 120 },
  { x: 180, y: 240, z: 170 },
  { x: 150, y: 200, z: 150 },
  { x: 170, y: 280, z: 210 },
  { x: 200, y: 260, z: 190 },
  { x: 210, y: 320, z: 240 },
  { x: 160, y: 240, z: 160 },
  { x: 190, y: 290, z: 200 },
  { x: 140, y: 180, z: 130 },
];

const stackedData: StackedAreaDataItem[] = [
  { name: "Jan", series1: 400, series2: 240, series3: 200, series4: 180 },
  { name: "Feb", series1: 300, series2: 139, series3: 220, series4: 195 },
  { name: "Mar", series1: 500, series2: 980, series3: 229, series4: 200 },
  { name: "Apr", series1: 278, series2: 390, series3: 200, series4: 218 },
  { name: "May", series1: 189, series2: 480, series3: 218, series4: 230 },
  { name: "Jun", series1: 239, series2: 380, series3: 250, series4: 210 },
  { name: "Jul", series1: 349, series2: 430, series3: 210, series4: 240 },
  { name: "Aug", series1: 420, series2: 510, series3: 280, series4: 260 },
  { name: "Sep", series1: 380, series2: 460, series3: 240, series4: 250 },
  { name: "Oct", series1: 450, series2: 530, series3: 290, series4: 270 },
  { name: "Nov", series1: 500, series2: 580, series3: 310, series4: 290 },
  { name: "Dec", series1: 550, series2: 620, series3: 340, series4: 300 },
];

export default function PerformancePage() {
  return (
    <div className="space-y-6 min-w-0">
      <Header title="PERFORMANCE" subtitle="Track team skills, metrics, and comparative analysis" />

      {/* Gauge Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <GaugeChart value={94.2} target={95} label="Code Quality" size={180} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <GaugeChart value={87.5} target={90} label="Test Coverage" size={180} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <GaugeChart value={78.3} target={85} label="Performance" size={180} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <GaugeChart value={96.1} target={98} label="Uptime" size={180} />
          </CardContent>
        </Card>
      </div>

      {/* Radar + Scatter */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Skills Radar</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <RadarChartComponent
              data={radarData}
              label1="Actual"
              label2="Target"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Effort vs Impact</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ScatterChartComponent
              data1={scatterData1}
              data2={scatterData2}
              label1="Sprint 1"
              label2="Sprint 2"
              xLabel="Effort"
              yLabel="Impact"
            />
          </CardContent>
        </Card>
      </div>

      {/* Stacked Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cumulative Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <StackedAreaChart
            data={stackedData}
            series={[
              { key: "series1", color: "#16a34a", label: "Frontend" },
              { key: "series2", color: "#2563eb", label: "Backend" },
              { key: "series3", color: "#f59e0b", label: "DevOps" },
              { key: "series4", color: "#8b5cf6", label: "Design" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
