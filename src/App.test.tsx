import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/layouts/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import TeamPage from "@/pages/TeamPage";
import ContactsPage from "@/pages/ContactsPage";
import InvoicesPage from "@/pages/InvoicesPage";
import FormPage from "@/pages/FormPage";
import FAQPage from "@/pages/FAQPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

function renderWithRouter(initialRoute: string) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <TooltipProvider>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/invoices" element={<InvoicesPage />} />
                  <Route path="/form" element={<FormPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe("App routing", () => {
  it("renders Dashboard page at /", () => {
    renderWithRouter("/");
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
  });

  it("renders Team page at /team", () => {
    renderWithRouter("/team");
    expect(screen.getByText("TEAM")).toBeInTheDocument();
  });

  it("renders Contacts page at /contacts", () => {
    renderWithRouter("/contacts");
    expect(screen.getByText("CONTACTS")).toBeInTheDocument();
  });

  it("renders Invoices page at /invoices", () => {
    renderWithRouter("/invoices");
    expect(screen.getByText("INVOICES")).toBeInTheDocument();
  });

  it("renders Form page at /form", () => {
    renderWithRouter("/form");
    expect(screen.getByText("CREATE USER")).toBeInTheDocument();
  });

  it("renders FAQ page at /faq", () => {
    renderWithRouter("/faq");
    expect(screen.getAllByText("FAQ").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 404 page for unknown routes", () => {
    renderWithRouter("/nonexistent");
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
