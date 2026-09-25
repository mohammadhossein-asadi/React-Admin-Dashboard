import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { BarChart } from "@/components/charts/BarChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ecommerceProducts, ecommerceOrders, categoryRevenue } from "@/data/ecommerce-data";
import { Search, ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export default function EcommercePage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...new Set(ecommerceProducts.map((p) => p.category))];

  const filteredProducts = ecommerceProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = ecommerceOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalProducts = ecommerceProducts.length;
  const totalSold = ecommerceProducts.reduce((sum, p) => sum + p.sold, 0);

  return (
    <div className="space-y-6 min-w-0">
      <Header subtitle={t("Manage products, orders, and sales analytics")} />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-success/10 p-2 text-success">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-success">+12.5%</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground">{t("Total Revenue")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-blue-500/10 p-2 text-blue-500">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-success">+8.3%</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{ecommerceOrders.length}</p>
              <p className="text-sm text-muted-foreground">{t("Total Orders")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-purple-500/10 p-2 text-purple-500">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-success">+5.2%</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{totalProducts}</p>
              <p className="text-sm text-muted-foreground">{t("Products")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-orange-500/10 p-2 text-orange-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-success">+18.7%</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{totalSold.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{t("Units Sold")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Revenue by Category")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full">
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {categoryRevenue.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-3 rounded-lg border p-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <p className="text-sm font-medium">{t(cat.name)}</p>
                        <p className="text-xs text-muted-foreground">
                          ${cat.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Sales Trend")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart isDashboard />
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t("Products")}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search products...")}
                className="pl-8 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex rounded-md border">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  className="rounded-none first:rounded-l-md last:rounded-r-md"
                >
                  {cat === "All" ? t("All") : t(cat)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Product")}</TableHead>
                <TableHead>{t("Category")}</TableHead>
                <TableHead className="text-right">{t("Price")}</TableHead>
                <TableHead className="text-right">{t("Stock")}</TableHead>
                <TableHead className="text-right">{t("Sold")}</TableHead>
                <TableHead className="text-right">{t("Rating")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{product.image}</span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t(product.category)}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${product.price}</TableCell>
                  <TableCell className="text-right">
                    <span className={product.stock < 50 ? "text-destructive" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{product.sold.toLocaleString()}</TableCell>
                  <TableCell className="text-right">⭐ {product.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("Recent Orders")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Order ID")}</TableHead>
                <TableHead>{t("Customer")}</TableHead>
                <TableHead>{t("Product")}</TableHead>
                <TableHead className="text-right">{t("Amount")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("Date")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecommerceOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-success">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="text-right font-medium">${order.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]} variant="secondary">
                      {t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
