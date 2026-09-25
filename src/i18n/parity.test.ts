import { describe, it, expect } from "vitest";
import i18n from "@/i18n";
import { resources } from "@/i18n/resources";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const NON_EN = SUPPORTED_LANGUAGES.filter((lng) => lng !== "en");

describe("i18n parity", () => {
  it("defines resources for every supported non-English language", () => {
    for (const lng of NON_EN) {
      expect(resources[lng as keyof typeof resources], `missing ${lng}`).toBeDefined();
    }
  });

  it("keeps identical key sets across all languages", () => {
    const keySets = NON_EN.map(
      (lng) =>
        new Set(
          Object.keys(
            resources[lng as keyof typeof resources].translation as Record<string, string>
          )
        )
    );
    expect(keySets.length).toBeGreaterThan(0);
    const reference = [...keySets[0]!].sort();
    expect(reference.length).toBeGreaterThan(50);

    NON_EN.forEach((lng, i) => {
      expect([...keySets[i]!].sort(), `key mismatch in ${lng}`).toEqual(reference);
    });
  });

  it("translates a sample key in every language without falling back to English", async () => {
    for (const lng of NON_EN) {
      await i18n.changeLanguage(lng);
      const translated = i18n.t("Save Changes");
      expect(translated, `missing translation in ${lng}`).not.toBe("Save Changes");
      expect(translated.length).toBeGreaterThan(0);
    }
    await i18n.changeLanguage("en");
    expect(i18n.t("Save Changes")).toBe("Save Changes");
  });
});
