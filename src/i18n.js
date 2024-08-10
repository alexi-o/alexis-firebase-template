import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to our application!",
      settings: "Settings",
      theme: "Theme",
      timezone: "Timezone",
      language: "Language",
      save: "Save Settings",
    },
  },
  es: {
    translation: {
      welcome: "¡Bienvenido a nuestra aplicación!",
      settings: "Configuraciones",
      theme: "Tema",
      timezone: "Zona horaria",
      language: "Idioma",
      save: "Guardar configuraciones",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
