import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/layouts/AppLayout";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage"));
const InvoicesPage = lazy(() => import("@/pages/InvoicesPage"));
const FormPage = lazy(() => import("@/pages/FormPage"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const BarChartPage = lazy(() => import("@/pages/BarChartPage"));
const PieChartPage = lazy(() => import("@/pages/PieChartPage"));
const LineChartPage = lazy(() => import("@/pages/LineChartPage"));
const GeographyPage = lazy(() => import("@/pages/GeographyPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const KanbanPage = lazy(() => import("@/pages/KanbanPage"));
const EcommercePage = lazy(() => import("@/pages/EcommercePage"));
const EmailPage = lazy(() => import("@/pages/EmailPage"));
const TicketsPage = lazy(() => import("@/pages/TicketsPage"));
const PerformancePage = lazy(() => import("@/pages/PerformancePage"));
const SocialPage = lazy(() => import("@/pages/SocialPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>}>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/invoices" element={<InvoicesPage />} />
                  <Route path="/form" element={<FormPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/bar" element={<BarChartPage />} />
                  <Route path="/pie" element={<PieChartPage />} />
                  <Route path="/line" element={<LineChartPage />} />
                  <Route path="/geography" element={<GeographyPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/kanban" element={<KanbanPage />} />
                  <Route path="/ecommerce" element={<EcommercePage />} />
                  <Route path="/email" element={<EmailPage />} />
                  <Route path="/tickets" element={<TicketsPage />} />
                  <Route path="/performance" element={<PerformancePage />} />
                  <Route path="/social" element={<SocialPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
