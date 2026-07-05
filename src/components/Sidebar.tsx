import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Contact,
  Receipt,
  UserPlus,
  Calendar,
  HelpCircle,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category?: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard, category: "Main" },
  { title: "Manage Team", href: "/team", icon: Users, category: "Data" },
  { title: "Contacts", href: "/contacts", icon: Contact, category: "Data" },
  { title: "Invoices", href: "/invoices", icon: Receipt, category: "Data" },
  { title: "Profile Form", href: "/form", icon: UserPlus, category: "Pages" },
  { title: "Calendar", href: "/calendar", icon: Calendar, category: "Pages" },
  { title: "FAQ", href: "/faq", icon: HelpCircle, category: "Pages" },
  { title: "Bar Chart", href: "/bar", icon: BarChart3, category: "Charts" },
  { title: "Pie Chart", href: "/pie", icon: PieChart, category: "Charts" },
  { title: "Line Chart", href: "/line", icon: LineChart, category: "Charts" },
  { title: "Geography", href: "/geography", icon: Map, category: "Charts" },
];

function SidebarContent({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) {
  const location = useLocation();

  const categories = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

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
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      {/* Profile */}
      {!collapsed && (
        <div className="flex flex-col items-center py-6">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-sidebar-accent">
            <img
              src="https://i.ibb.co/vQPbSKj/user.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-semibold text-sidebar-foreground">Mohammadhossein</p>
            <p className="text-xs text-success">VP Fancy Admin</p>
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
                  {category}
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
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    )}
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
  const [collapsed, setCollapsed] = useState(false);

  // برای موبایل، صرفاً محتوا را بدون Sheet نمایش دهید
  if (isMobile) {
    return (
      <SidebarContent collapsed={false} onCollapse={() => {}} />
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
      </aside>
    </>
  );
}
