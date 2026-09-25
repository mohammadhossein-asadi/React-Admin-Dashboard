import { test, expect } from "@playwright/test";

test.describe("Dashboard navigation", () => {
  test("loads dashboard and shows 19 pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('h2:has-text("DASHBOARD")')).toBeVisible();
    await expect(page.locator("text=ADMINIS")).toBeVisible();
  });

  test("navigates to all 19 pages via sidebar", async ({ page }) => {
    await page.goto("/");
    const pages = [
      { path: "/", heading: "DASHBOARD" },
      { path: "/team", heading: "TEAM" },
      { path: "/contacts", heading: "CONTACTS" },
      { path: "/invoices", heading: "INVOICES" },
      { path: "/form", heading: "CREATE USER" },
      { path: "/calendar", heading: "Calendar" },
      { path: "/faq", heading: "FAQ" },
      { path: "/bar", heading: "Bar Chart" },
      { path: "/pie", heading: "Pie Chart" },
      { path: "/line", heading: "Line Chart" },
      { path: "/geography", heading: "Geography Chart" },
      { path: "/analytics", heading: "ANALYTICS" },
      { path: "/kanban", heading: "KANBAN" },
      { path: "/ecommerce", heading: "E-COMMERCE" },
      { path: "/email", heading: "EMAIL" },
      { path: "/tickets", heading: "SUPPORT TICKETS" },
      { path: "/performance", heading: "PERFORMANCE" },
      { path: "/social", heading: "TEAM FEED" },
      { path: "/settings", heading: "SETTINGS" },
    ];

    for (const { path, heading } of pages) {
      await page.goto(path);
      await expect(page.locator(`text=${heading}`).first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("shows 404 for unknown routes", async ({ page }) => {
    await page.goto("/nonexistent");
    await expect(page.locator("text=Page Not Found")).toBeVisible();
  });
});

test.describe("Team page search and sort", () => {
  test("searches team members by name", async ({ page }) => {
    await page.goto("/team");
    await page.waitForSelector("tbody tr");
    await page.fill('input[placeholder="Search by name..."]', "anya");
    await page.waitForTimeout(500);
    const rows = page.locator("tbody tr");
    await expect(rows.filter({ hasText: "Anya" })).toBeVisible({ timeout: 10000 });
    await expect(rows.filter({ hasText: "Jon" })).not.toBeVisible();
  });

  test("sorts team table by column", async ({ page }) => {
    await page.goto("/team");
    await page.click('th:has-text("Name")');
    await page.waitForTimeout(500);
    const names = await page.locator("tbody tr td:nth-child(2)").allTextContents();
    expect(names).toEqual([...names].sort());
  });
});

test.describe("Form validation", () => {
  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.goto("/form");
    await page.click('button:has-text("Create New User")');
    await expect(page.locator("text=First name is required")).toBeVisible();
    await expect(page.locator("text=Last name is required")).toBeVisible();
    await expect(page.locator("text=Invalid email address")).toBeVisible();
    await expect(page.locator("text=Contact number is required")).toBeVisible();
    await expect(page.locator("text=Address is required")).toHaveCount(2);
  });

  test("submits successfully with valid data", async ({ page }) => {
    await page.goto("/form");
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#email", "john@example.com");
    await page.fill("#contact", "1234567890");
    await page.fill("#address1", "123 Main St");
    await page.fill("#address2", "Apt 1");
    await page.click('button:has-text("Create New User")');
    await expect(page.locator("text=User created successfully!")).toBeVisible();
  });
});

test.describe("Language switch", () => {
  test("switches language and updates UI strings", async ({ page }) => {
    await page.goto("/settings");
    await page.click('button[role="tab"]:has-text("Appearance")');
    await page.selectOption('select[aria-label="Preferred language"]', "es");
    await expect(page.locator('button[role="tab"]:has-text("Apariencia")')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('h2:has-text("CONFIGURACIÓN")')).toBeVisible();
  });

  test("persists language to team page", async ({ page }) => {
    await page.goto("/settings");
    await page.click('button[role="tab"]:has-text("Appearance")');
    await page.selectOption('select[aria-label="Preferred language"]', "fr");
    await page.goto("/team");
    await expect(page.locator('h2:has-text("ÉQUIPE")')).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Command palette search", () => {
  test("opens search and searches pages", async ({ page }) => {
    await page.goto("/");
    await page.click('input[placeholder="Search pages, people, invoices..."]');
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 10000 });
    await page.fill('input[placeholder="Search pages, people, invoices..."]', "chart");
    await page.waitForTimeout(500);
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog.locator("text=Bar Chart").first()).toBeVisible({ timeout: 10000 });
    await expect(dialog.locator("text=Pie Chart").first()).toBeVisible({ timeout: 10000 });
    await expect(dialog.locator("text=Line Chart").first()).toBeVisible({ timeout: 10000 });
  });

  test("navigates to selected result", async ({ page }) => {
    await page.goto("/");
    await page.click('input[placeholder="Search pages, people, invoices..."]');
    await page.fill('input[placeholder="Search pages, people, invoices..."]', "invoice");
    await page.locator('[role="option"]:has-text("Invoices")').click();
    await expect(page).toHaveURL("/invoices");
  });
});

test.describe("Kanban board", () => {
  test("creates a new task", async ({ page }) => {
    await page.goto("/kanban");
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Enter task title"]', "Test task");
    await page.fill('input[placeholder="Enter task description"]', "Test description");
    await page.fill('input[placeholder="Enter assignee name"]', "Test User");
    await page.click('button:has-text("Create Task")');
    await expect(page.locator("text=Test task")).toBeVisible({ timeout: 10000 });
  });
});
