import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import locale from "~/locales"
import { HelmetProvider } from 'react-helmet-async'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: locale.en },
      zh_hant_tw: { translation: locale.zh_hant_tw },
      zh: { translation: locale.zh_hant_tw }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
