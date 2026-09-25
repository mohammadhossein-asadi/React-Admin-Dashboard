import { describe, it, expect, beforeEach } from "vitest";
import i18n from "@/i18n";

describe("i18n", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
  });

  it("falls back to the English key for untranslated strings", () => {
    expect(i18n.t("Dashboard")).toBe("Dashboard");
    expect(i18n.t("Choose your primary accent color")).toBe("Choose your primary accent color");
  });

  it("translates nav titles when the language changes", async () => {
    await i18n.changeLanguage("es");
    expect(i18n.t("Dashboard")).toBe("Panel");
    expect(i18n.t("Settings")).toBe("Configuración");
    expect(i18n.t("Pages")).toBe("Páginas");
  });

  it("translates into RTL languages", async () => {
    await i18n.changeLanguage("fa");
    expect(i18n.t("Settings")).toBe("تنظیمات");
    await i18n.changeLanguage("ar");
    expect(i18n.t("Language")).toBe("اللغة");
  });

  it("returns to English after switching back", async () => {
    await i18n.changeLanguage("ja");
    expect(i18n.t("Dashboard")).toBe("ダッシュボード");
    await i18n.changeLanguage("en");
    expect(i18n.t("Dashboard")).toBe("Dashboard");
  });
});
