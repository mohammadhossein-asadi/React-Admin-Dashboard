import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/layouts/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import TeamPage from "@/pages/TeamPage";
import ContactsPage from "@/pages/ContactsPage";
import InvoicesPage from "@/pages/InvoicesPage";
import FormPage from "@/pages/FormPage";
import CalendarPage from "@/pages/CalendarPage";
import FAQPage from "@/pages/FAQPage";
import BarChartPage from "@/pages/BarChartPage";
import PieChartPage from "@/pages/PieChartPage";
import LineChartPage from "@/pages/LineChartPage";
import GeographyPage from "@/pages/GeographyPage";

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
