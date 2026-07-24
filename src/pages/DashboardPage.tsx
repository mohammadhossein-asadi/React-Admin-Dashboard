import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { StatBox } from "@/components/StatBox";
import { ProgressCircle } from "@/components/ProgressCircle";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { GeographyChart } from "@/components/charts/GeographyChart";
import { PieChart } from "@/components/charts/PieChart";
import { RecentActivity } from "@/components/RecentActivity";
import { RealtimeMetrics } from "@/components/RealtimeMetrics";
import { ComparisonTable } from "@/components/ComparisonTable";
import { GoalTracker } from "@/components/GoalTracker";
import { TeamPerformanceGrid } from "@/components/TeamPerformanceGrid";
import { mockTransactions, mockProducts, mockComparisonData } from "@/data/mock-data";
import { realtimeMetrics, comparisonData, goalsData, teamPerformanceData } from "@/data/social-data";
import { Download, Mail, DollarSign, UserPlus, TrendingUp } from "lucide-react";

type Period = "thisWeek" | "thisMonth" | "thisYear";

const periodLabels: Record<Period, string> = {
  thisWeek: "This Week",
  thisMonth: "This Month",
  thisYear: "This Year",
};

const sparklineTrends = {
  thisWeek: {
    emails: [8, 12, 10, 14, 11, 13, 12],
    sales: [30, 35, 32, 40, 38, 42, 43],
    clients: [2, 3, 2, 4, 3, 3, 3],
    traffic: [80, 95, 88, 100, 92, 110, 132],
  },
  thisMonth: {
    emails: [40, 45, 42, 48, 44, 46, 48],
    sales: [150, 165, 155, 180, 170, 178, 184],
    clients: [10, 12, 11, 14, 12, 13, 12],
    traffic: [400, 450, 420, 500, 480, 510, 523],
  },
  thisYear: {
    emails: [400, 450, 420, 480, 440, 460, 542],
    sales: [1500, 1650, 1550, 1800, 1700, 1780, 2150],
    clients: [100, 120, 110, 140, 120, 130, 142],
    traffic: [4000, 4500, 4200, 5000, 4800, 5100, 6240],
  },
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("thisWeek");
  const data = mockComparisonData[period];
  const trends = sparklineTrends[period];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            {(Object.keys(periodLabels) as Period[]).map((key) => (
              <Button
                key={key}
                variant={period === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setPeriod(key)}
                className="rounded-none first:rounded-l-md last:rounded-r-md"
              >
                {periodLabels[key]}
              </Button>
            ))}
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stat Boxes */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox
          title={data.emailsSent}
          subtitle="Emails Sent"
          progress={data.emailsProgress}
          increase={data.emailsIncrease}
          icon={<Mail className="h-6 w-6" />}
          sparklineData={trends.emails}
        />
        <StatBox
          title={`$${data.sales}`}
          subtitle="Sales Obtained"
          progress={data.salesProgress}
          increase={data.salesIncrease}
          icon={<DollarSign className="h-6 w-6" />}
          sparklineData={trends.sales}
        />
        <StatBox
          title={data.clients}
          subtitle="New Clients"
          progress={data.clientsProgress}
          increase={data.clientsIncrease}
          icon={<UserPlus className="h-6 w-6" />}
          sparklineData={trends.clients}
        />
        <StatBox
          title={data.traffic}
          subtitle="Traffic Received"
          progress={data.trafficProgress}
          increase={data.trafficIncrease}
          icon={<TrendingUp className="h-6 w-6" />}
          sparklineData={trends.traffic}
        />
      </div>

      {/* Real-time Metrics */}
      <RealtimeMetrics metrics={realtimeMetrics} />

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Generated</CardTitle>
            <p className="text-2xl font-bold text-success">$59,342.32</p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LineChart isDashboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[350px] overflow-y-auto">
            <div className="space-y-3">
              {mockTransactions.map((tx) => (
                <div
                  key={tx.txId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-success">{tx.txId}</p>
                    <p className="text-sm text-muted-foreground">{tx.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                  <span className="rounded-md bg-success/10 px-2 py-1 text-sm font-medium text-success">
                    ${tx.cost}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Revenue Breakdown + Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PieChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales.toLocaleString()} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-success">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p
                      className={
                        product.growth >= 0
                          ? "text-xs text-success"
                          : "text-xs text-destructive"
                      }
                    >
                      {product.growth >= 0 ? "+" : ""}
                      {product.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Campaign</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ProgressCircle progress={0.75} size={140} showLabel />
            <p className="mt-4 text-center text-sm font-medium text-success">
              $48,352 revenue generated
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Includes extra misc expenditures and costs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Quantity</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <BarChart isDashboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geography Based Traffic</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <GeographyChart isDashboard />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>

      {/* Comparison Table + Goal Tracker */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ComparisonTable data={comparisonData} />
        <GoalTracker goals={goalsData} />
      </div>

      {/* Team Performance */}
      <TeamPerformanceGrid team={teamPerformanceData} />
    </div>
  );
}
