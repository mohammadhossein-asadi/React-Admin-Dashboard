import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { supportTickets, ticketStats } from "@/data/tickets-data";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusColors = {
  open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  resolved: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  closed: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

const statusLabels = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export default function TicketsPage() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const filteredTickets = supportTickets.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const matchesSearch =
      search === "" ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6 min-w-0">
      <Header subtitle={t("Manage customer support requests")} />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">{ticketStats.open}</p>
            <p className="text-sm text-muted-foreground">{t("Open")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">{ticketStats.inProgress}</p>
            <p className="text-sm text-muted-foreground">{t("In Progress")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">{ticketStats.resolved}</p>
            <p className="text-sm text-muted-foreground">{t("Resolved")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{ticketStats.avgResponseTime}</p>
            <p className="text-sm text-muted-foreground">{t("Avg Response")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">{ticketStats.satisfactionRate}%</p>
            <p className="text-sm text-muted-foreground">{t("Satisfaction")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search tickets...")}
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex rounded-md border">
              <Button
                variant={statusFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="rounded-none first:rounded-l-md"
              >
                {t("All")}
              </Button>
              {Object.entries(statusLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={statusFilter === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter(key)}
                  className="rounded-none last:rounded-r-md"
                >
                  {t(label)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="p-4">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={expandedTicket === ticket.id}
                className="flex cursor-pointer items-start justify-between"
                onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id);
                  }
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                    <h3 className="font-medium">{ticket.subject}</h3>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{ticket.customer}</span>
                    <span>•</span>
                    <span>{t(ticket.category)}</span>
                    <span>•</span>
                    <span>{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={priorityColors[ticket.priority]} variant="secondary">
                    {t(ticket.priority)}
                  </Badge>
                  <Badge className={statusColors[ticket.status]} variant="secondary">
                    {t(statusLabels[ticket.status])}
                  </Badge>
                  {expandedTicket === ticket.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedTicket === ticket.id && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  {ticket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-lg p-3 ${msg.isAgent ? "ml-8 bg-success/5" : "mr-8 bg-muted"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{msg.content}</p>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Input placeholder={t("Type a reply...")} className="flex-1" />
                    <Button size="sm">{t("Reply")}</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
