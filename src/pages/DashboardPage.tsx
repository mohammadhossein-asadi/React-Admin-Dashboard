import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { StatBox } from "@/components/StatBox";
import { ProgressCircle } from "@/components/ProgressCircle";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { GeographyChart } from "@/components/charts/GeographyChart";
import { mockTransactions } from "@/data/mock-data";
import { Download, Mail, DollarSign, UserPlus, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Reports
        </Button>
      </div>

      {/* Stat Boxes */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox
          title="12,361"
          subtitle="Emails Sent"
          progress={0.75}
          increase="+14%"
          icon={<Mail className="h-6 w-6" />}
        />
        <StatBox
          title="431,225"
          subtitle="Sales Obtained"
          progress={0.5}
          increase="+21%"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatBox
          title="32,441"
          subtitle="New Clients"
          progress={0.3}
          increase="+5%"
          icon={<UserPlus className="h-6 w-6" />}
        />
        <StatBox
          title="1,325,134"
          subtitle="Traffic Received"
          progress={0.8}
          increase="+43%"
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

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
    </div>
  );
}
