import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { groupNavItemsByCategory } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COLLAPSE_KEY = "sidebar-collapsed";

function SidebarContent({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

  const categories = groupNavItemsByCategory();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-tight text-foreground">ADMINIS</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onCollapse}
          className="h-8 w-8 shrink-0"
          aria-label={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      {/* Profile */}
      {!collapsed && (
        <div className="flex flex-col items-center py-6">
          <Avatar className="h-20 w-20 border-2 border-sidebar-accent">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
            <AvatarFallback className="bg-success/10 text-base text-success">
              {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-3 text-center">
            <p className="text-sm font-semibold text-sidebar-foreground">{user.firstName}</p>
            <p className="text-xs text-success">{user.bio}</p>
          </div>
        </div>
      )}

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <TooltipProvider delayDuration={0}>
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="mb-4">
              {!collapsed && (
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(category)}
                </p>
              )}
              {items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{t(item.title)}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{t(item.title)}</TooltipContent>}
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </TooltipProvider>
      </ScrollArea>
    </div>
  );
}

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "true");

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSE_KEY, String(next));
      return next;
    });
  };

  // Mobile mode: render content without Sheet wrapper
  if (isMobile) {
    return <SidebarContent collapsed={false} onCollapse={() => {}} />;
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} onCollapse={toggleCollapse} />
      </aside>
    </>
  );
}
