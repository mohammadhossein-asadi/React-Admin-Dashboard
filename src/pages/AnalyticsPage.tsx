import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Sparkline } from "@/components/charts/Sparkline";
import { AreaChart } from "@/components/charts/AreaChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  kpiData,
  trafficData7Days,
  trafficData30Days,
  trafficData90Days,
  topPages,
  funnelData,
} from "@/data/analytics-data";
import { Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

type DateRange = "7d" | "30d" | "90d";

const dateRangeLabels: Record<DateRange, string> = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
};

const kpiIcons = [DollarSign, Users, TrendingUp, TrendingDown];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("7d");

  const trafficData = useMemo(() => {
    switch (dateRange) {
      case "7d":
        return trafficData7Days;
      case "30d":
        return trafficData30Days;
      case "90d":
        return trafficData90Days;
    }
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Header title="ANALYTICS" subtitle="Track your key performance metrics" />
        <div className="flex rounded-md border">
          {(Object.keys(dateRangeLabels) as DateRange[]).map((key) => (
            <Button
              key={key}
              variant={dateRange === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange(key)}
              className="rounded-none first:rounded-l-md last:rounded-r-md"
            >
              {dateRangeLabels[key]}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpiIcons[index] ?? DollarSign;
          return (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-success/10 p-2 text-success">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p
                    className={
                      kpi.change >= 0 ? "text-sm font-medium text-success" : "text-sm font-medium text-destructive"
                    }
                  >
                    {kpi.change >= 0 ? "+" : ""}
                    {kpi.change}%
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
                <div className="mt-3">
                  <Sparkline data={kpi.sparkline} height={32} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Traffic Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <AreaChart
            data={trafficData}
            dataKey1="visitors"
            dataKey2="pageViews"
            xAxisKey="date"
            color1="#16a34a"
            color2="#2563eb"
            label1="Visitors"
            label2="Page Views"
          />
        </CardContent>
      </Card>

      {/* Bottom Row: Top Pages + Conversion Funnel */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Unique</TableHead>
                  <TableHead className="text-right">Bounce</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow key={page.page}>
                    <TableCell className="font-medium text-success">{page.page}</TableCell>
                    <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.uniqueVisitors.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.bounceRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((step, index) => (
                <div key={step.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{step.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {step.value.toLocaleString()}
                      </p>
                      <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                        {step.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-8 overflow-hidden rounded-md bg-muted">
                    <div
                      className="absolute inset-y-0 left-0 rounded-md bg-success/80"
                      style={{
                        width: `${step.percentage}%`,
                        opacity: 1 - index * 0.15,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
