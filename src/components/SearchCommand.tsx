import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Search, Users, Contact, Receipt } from "lucide-react";
import { mockDataTeam, mockDataContacts, mockDataInvoices } from "@/data/mock-data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pages: SearchResult[] = routes.map((item) => ({
  id: `page-${item.href === "/" ? "dashboard" : item.href.slice(1)}`,
  title: item.title,
  subtitle: item.subtitle,
  href: item.href,
  category: "Pages",
  icon: item.icon,
}));

export function SearchCommand() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matched: SearchResult[] = [];

    for (const page of pages) {
      const title = t(page.title);
      const subtitle = t(page.subtitle);
      if (title.toLowerCase().includes(q) || subtitle.toLowerCase().includes(q)) {
        matched.push({ ...page, title, subtitle });
      }
    }

    for (const member of mockDataTeam) {
      if (member.name.toLowerCase().includes(q) || member.email.toLowerCase().includes(q)) {
        matched.push({
          id: `team-${member.id}`,
          title: member.name,
          subtitle: `${t(member.access)} · ${member.email}`,
          href: "/team",
          category: "Team",
          icon: Users,
        });
      }
    }

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

    for (const invoice of mockDataInvoices) {
      if (invoice.name.toLowerCase().includes(q) || invoice.email.toLowerCase().includes(q)) {
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
  }, [query, t]);

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleSelect = useCallback(
    (href: string) => {
      navigate(href);
      setOpen(false);
      setQuery("");
      setActiveIndex(-1);
    },
    [navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (results.length === 0) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setOpen(true);
          setActiveIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
          break;
        case "Enter":
          if (activeIndex >= 0 && results[activeIndex]) {
            e.preventDefault();
            handleSelect(results[activeIndex].href);
          }
          break;
        case "Escape":
          setOpen(false);
          setActiveIndex(-1);
          break;
      }
    },
    [results, activeIndex, handleSelect]
  );

  const groupedResults = useMemo(() => {
    const groups: Record<string, { result: SearchResult; index: number }[]> = {};
    results.forEach((result, index) => {
      (groups[result.category] ??= []).push({ result, index });
    });
    return groups;
  }, [results]);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setActiveIndex(-1);
      }}
    >
      <PopoverTrigger asChild>
        <div className="relative flex-1 max-w-md cursor-pointer">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            placeholder={t("Search pages, people, invoices...")}
            aria-label={t("Search pages, people, invoices...")}
            role="combobox"
            aria-expanded={open}
            aria-controls="search-results-list"
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(e.target.value.length > 0);
              setActiveIndex(-1);
            }}
            onFocus={() => {
              if (query.length > 0) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[400px] p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          id="search-results-list"
          role="listbox"
          aria-label="Search results"
          className="max-h-[400px] overflow-y-auto"
          ref={listRef}
        >
          {results.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t("No results found for")} &ldquo;{query}&rdquo;
            </div>
          )}
          {Object.entries(groupedResults).map(([category, entries], i) => (
            <div key={category}>
              {i > 0 && <Separator />}
              <p
                id={`search-group-${i}`}
                className="px-3 py-2 text-xs font-medium text-muted-foreground"
                role="presentation"
              >
                {t(category)}
              </p>
              {entries.map(({ result, index }) => {
                const Icon = result.icon;
                const isActive = index === activeIndex;
                return (
                  <div
                    key={result.id}
                    id={`search-result-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isActive}
                    tabIndex={-1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(result.href);
                      }
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(result.href)}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
