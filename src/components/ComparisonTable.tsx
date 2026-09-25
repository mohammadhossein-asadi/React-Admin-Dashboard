import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ComparisonRow } from "@/types";

interface ComparisonTableProps {
  data: ComparisonRow[];
  title?: string;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

export function ComparisonTable({ data, title }: ComparisonTableProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t("Period Comparison");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{resolvedTitle}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Metric")}</TableHead>
              <TableHead className="text-right">{t("Current")}</TableHead>
              <TableHead className="text-right">{t("Previous")}</TableHead>
              <TableHead className="text-right">{t("Change")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const TrendIcon = trendIcons[row.trend];
              const isPositive =
                row.trend === "up" || (row.trend === "down" && row.metric === "Bounce Rate");
              return (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="text-right font-semibold">{row.current}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{row.previous}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 ${isPositive ? "text-success" : "text-destructive"}`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      <span className="text-sm font-medium">
                        {row.change > 0 ? "+" : ""}
                        {row.change}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
