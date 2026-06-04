import { prettifyJsonDocument } from "@/src/prettify";

const JSON_MIME_TYPE = "application/json";

const normalizeMimeType = (contentType: string): string => {
  return contentType.split(";", 1)[0].trim().toLowerCase();
};

export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],
  runAt: "document_idle",
  main() {
    if (normalizeMimeType(document.contentType) === JSON_MIME_TYPE) {
      void prettifyJsonDocument();
    }
  },
});
