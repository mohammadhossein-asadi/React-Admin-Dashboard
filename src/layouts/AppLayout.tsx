import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

function SignedOutScreen() {
  const { t } = useTranslation();
  const { login } = useAuth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-xl">{t("Signed out")}</CardTitle>
          <CardDescription>{t("You have been signed out of the dashboard.")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={login} className="w-full">
            <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Sign back in")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function AppLayout() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <SignedOutScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden min-w-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        {t("Skip to main content")}
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <TopBar onOpenMenu={() => setMenuOpen(true)} />
          <SheetContent side="left" className="w-64 p-0" aria-label="Navigation menu">
            <Sidebar isMobile />
          </SheetContent>
        </Sheet>
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6 animate-fade-in"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
