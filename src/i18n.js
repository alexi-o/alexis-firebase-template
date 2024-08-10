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
      metadataExtraction: "Metadata Extraction",
      viewGithubRepo: "View the GitHub Repository",
      uploadSuccess: "Image successfully uploaded!",
      uploadFailure: "Failed to save image metadata.",
      updateSuccess: "Image data successfully updated!",
      updateFailure: "Failed to update image data.",
      deleteSuccess: "Image successfully deleted!",
      deleteFailure: "Failed to delete image.",
      copySuccess: "Metadata copied to clipboard!",
      internalServerError: "Internal Server Error: Unable to extract metadata",
      processError: "Error: Unable to process request",
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
      metadataExtraction: "Extracción de Metadatos",
      viewGithubRepo: "Ver el Repositorio en GitHub",
      uploadSuccess: "¡Imagen subida con éxito!",
      uploadFailure: "Error al guardar los metadatos de la imagen.",
      updateSuccess: "¡Datos de la imagen actualizados con éxito!",
      updateFailure: "Error al actualizar los datos de la imagen.",
      deleteSuccess: "¡Imagen eliminada con éxito!",
      deleteFailure: "Error al eliminar la imagen.",
      copySuccess: "¡Metadatos copiados al portapapeles!",
      internalServerError:
        "Error Interno del Servidor: No se pueden extraer los metadatos",
      processError: "Error: No se puede procesar la solicitud",
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
