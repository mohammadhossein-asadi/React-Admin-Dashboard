import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNotifications } from "@/contexts/notifications-context";
import { CheckCheck, Trash2 } from "lucide-react";

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { t } = useTranslation();
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = useCallback(
    (id: string, href?: string) => {
      markRead(id);
      if (href) {
        navigate(href);
      }
      onClose();
    },
    [markRead, navigate, onClose]
  );

  return (
    <div className="w-[380px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{t("Notifications")}</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              {t("{{count}} new", { count: unreadCount })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="h-7 text-xs">
              <CheckCheck className="mr-1 h-3 w-3" aria-hidden="true" />
              {t("Mark all read")}
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-7 text-xs text-muted-foreground"
            >
              <Trash2 className="mr-1 h-3 w-3" aria-hidden="true" />
              {t("Clear")}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Notification List */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            {t("No notifications")}
          </div>
        ) : (
          notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id}>
                <button
                  onClick={() => handleNotificationClick(notification.id, notification.href)}
                  aria-label={`${t(notification.title)}${notification.read ? "" : ` ${t("(unread)")}`}`}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                    !notification.read && "bg-accent/30"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 rounded-md p-1.5",
                      notification.read
                        ? "bg-muted text-muted-foreground"
                        : "bg-success/10 text-success"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "text-sm truncate",
                          notification.read
                            ? "font-normal text-foreground"
                            : "font-medium text-foreground"
                        )}
                      >
                        {t(notification.title)}
                      </p>
                      {!notification.read && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </button>
                {index < notifications.length - 1 && <Separator />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
