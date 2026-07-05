import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Search, Users, Contact, Receipt, LayoutDashboard, FileText, Calendar, HelpCircle, BarChart3, PieChart, LineChart, Map } from "lucide-react";
import { mockDataTeam, mockDataContacts, mockDataInvoices } from "@/data/mock-data";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pages: SearchResult[] = [
  { id: "page-dashboard", title: "Dashboard", subtitle: "Main dashboard", href: "/", category: "Pages", icon: LayoutDashboard },
  { id: "page-team", title: "Manage Team", subtitle: "Team management", href: "/team", category: "Pages", icon: Users },
  { id: "page-contacts", title: "Contacts", subtitle: "Contact list", href: "/contacts", category: "Pages", icon: Contact },
  { id: "page-invoices", title: "Invoices", subtitle: "Invoice balances", href: "/invoices", category: "Pages", icon: Receipt },
  { id: "page-form", title: "Profile Form", subtitle: "Create user profile", href: "/form", category: "Pages", icon: FileText },
  { id: "page-calendar", title: "Calendar", subtitle: "Event calendar", href: "/calendar", category: "Pages", icon: Calendar },
  { id: "page-faq", title: "FAQ", subtitle: "Frequently asked questions", href: "/faq", category: "Pages", icon: HelpCircle },
  { id: "page-bar", title: "Bar Chart", subtitle: "Bar chart view", href: "/bar", category: "Charts", icon: BarChart3 },
  { id: "page-pie", title: "Pie Chart", subtitle: "Pie chart view", href: "/pie", category: "Charts", icon: PieChart },
  { id: "page-line", title: "Line Chart", subtitle: "Line chart view", href: "/line", category: "Charts", icon: LineChart },
  { id: "page-geography", title: "Geography", subtitle: "Geography chart view", href: "/geography", category: "Charts", icon: Map },
];

export function SearchCommand() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matched: SearchResult[] = [];

    // Search pages
    for (const page of pages) {
      if (page.title.toLowerCase().includes(q) || page.subtitle.toLowerCase().includes(q)) {
        matched.push(page);
      }
    }

    // Search team members
    for (const member of mockDataTeam) {
      if (
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q)
      ) {
        matched.push({
          id: `team-${member.id}`,
          title: member.name,
          subtitle: `${member.access} · ${member.email}`,
          href: "/team",
          category: "Team",
          icon: Users,
        });
      }
    }

    // Search contacts
    for (const contact of mockDataContacts) {
      if (
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.city.toLowerCase().includes(q)
      ) {
        matched.push({
          id: `contact-${contact.id}`,
          title: contact.name,
          subtitle: `${contact.city} · ${contact.email}`,
          href: "/contacts",
          category: "Contacts",
          icon: Contact,
        });
      }
    }

    // Search invoices
    for (const invoice of mockDataInvoices) {
      if (
        invoice.name.toLowerCase().includes(q) ||
        invoice.email.toLowerCase().includes(q)
      ) {
        matched.push({
          id: `invoice-${invoice.id}`,
          title: invoice.name,
          subtitle: `$${invoice.cost.toLocaleString()} · ${invoice.date}`,
          href: "/invoices",
          category: "Invoices",
          icon: Receipt,
        });
      }
    }

    return matched.slice(0, 10);
  }, [query]);

  const handleSelect = useCallback(
    (href: string) => {
      navigate(href);
      setOpen(false);
      setQuery("");
    },
    [navigate]
  );

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of results) {
      const group = groups[result.category];
      if (group) {
        group.push(result);
      } else {
        groups[result.category] = [result];
      }
    }
    return groups;
  }, [results]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1 max-w-md cursor-pointer">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search pages, people, invoices..."
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (query.length > 0) setOpen(true);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
          {results.length === 0 && !query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type to search...
            </div>
          )}
          {Object.entries(groupedResults).map(([category, items], i) => (
            <div key={category}>
              {i > 0 && <Separator />}
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground">{category}</p>
              {items.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => handleSelect(result.href)}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
