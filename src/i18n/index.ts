import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

export const SUPPORTED_LANGUAGES = ["en", "es", "fr", "de", "pt", "ja", "zh", "ko", "ar", "fa"];
export const RTL_LANGUAGES = new Set(["ar", "fa"]);

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
  keySeparator: false,
  nsSeparator: false,
  returnNull: false,
});

export default i18n;
