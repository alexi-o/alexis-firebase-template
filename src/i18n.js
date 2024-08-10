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
      copyToClipboard: "Copy to Clipboard",
      tagAdded: "Tag added",
      dragAndDrop: "Drag & drop images here, or click to select",
      description: "Description",
      tags: "Tags:",
      aiImageRecognition: "AI Image Recognition",
      extractImageMetadata: "Extract Image Metadata",
      saveChanges: "Save Changes",
      deleteImage: "Delete Image",
      uploadedImages: "Uploaded Images",
      alexisWorld: "Alexi's World",
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
      copyToClipboard: "Copiar al Portapapeles",
      tagAdded: "Etiqueta añadida",
      dragAndDrop:
        "Arrastra y suelta imágenes aquí, o haz clic para seleccionar",
      description: "Descripción",
      tags: "Etiquetas:",
      aiImageRecognition: "Reconocimiento de Imagen AI",
      extractImageMetadata: "Extraer Metadatos de Imagen",
      saveChanges: "Guardar Cambios",
      deleteImage: "Eliminar Imagen",
      uploadedImages: "Imágenes Subidas",
      alexisWorld: "El Mundo de Alexi",
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
