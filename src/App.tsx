import { lazy, Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { AuthProvider } from "@/contexts/auth-context";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteError } from "@/components/RouteError";
import { AppLayout } from "@/layouts/AppLayout";
import { routes } from "@/lib/routes";

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <AppLayout />,
          errorElement: <RouteError />,
          children: [
            ...routes.map(({ href, component: Page }) => ({
              path: href,
              element: <Page />,
            })),
            { path: "*", element: <NotFoundPage /> },
          ],
        },
      ]),
    []
  );

  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <NotificationsProvider>
            <TooltipProvider>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div
                      role="status"
                      className="flex h-screen flex-col items-center justify-center gap-4"
                    >
                      <div
                        className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary"
                        aria-hidden="true"
                      />
                      <p className="text-lg font-bold tracking-tight text-foreground">ADMINIS</p>
                      <span className="sr-only">Loading page...</span>
                    </div>
                  }
                >
                  <RouterProvider router={router} />
                </Suspense>
              </ErrorBoundary>
            </TooltipProvider>
          </NotificationsProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
