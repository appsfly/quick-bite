import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import he from "./locales/he.json";
import tl from "./locales/tl.json";
import si from "./locales/si.json";
import ta from "./locales/ta.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "he", label: "עברית" },
  { code: "tl", label: "Tagalog" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
] as const;

export const RTL_LANGUAGES = ["he"];

function applyDirection(lng: string) {
  document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? "rtl" : "ltr";
  document.documentElement.lang = lng;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
      tl: { translation: tl },
      si: { translation: si },
      ta: { translation: ta },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

applyDirection(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", applyDirection);

export default i18n;
