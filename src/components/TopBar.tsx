import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { useNotifications } from "@/contexts/notifications-context";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchCommand } from "@/components/SearchCommand";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { Moon, Sun, Bell, Settings, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TopBarProps {
  onOpenMenu?: () => void;
}

export function TopBar({ onOpenMenu }: TopBarProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Mobile Menu */}
      {onOpenMenu && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={t("Open menu")}
          aria-haspopup="dialog"
          onClick={onOpenMenu}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}

      {/* Search */}
      <div className="flex-1 mx-4 hidden sm:block">
        <SearchCommand />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? t("Switch to light mode") : t("Switch to dark mode")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === "dark" ? t("Light mode") : t("Dark mode")}</p>
            </TooltipContent>
          </Tooltip>

          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={
                  unreadCount > 0
                    ? t("Notifications, {{count}} unread", { count: unreadCount })
                    : t("Notifications")
                }
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                    <span className="sr-only">
                      {t("{{count}} unread notifications", { count: unreadCount })}
                    </span>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Settings")}
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("Settings")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-1" aria-label={t("Profile menu")}>
              <Avatar className="h-8 w-8">
                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate("/settings")}>
              <User className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("Profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("Settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("Log out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
