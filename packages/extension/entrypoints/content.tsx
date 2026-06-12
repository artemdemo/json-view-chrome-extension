import { prettifyJsonDocument } from "@/src/render";

const JSON_MIME_TYPE = "application/json";

const normalizeMimeType = (contentType: string | undefined | null): string => {
  if (!contentType) {
    return "";
  }
  return contentType.split(";", 1)[0].trim().toLowerCase();
};

export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],
  runAt: "document_start",
  main() {
    if (normalizeMimeType(document.contentType) !== JSON_MIME_TYPE) {
      return;
    }

    // Hide the browser-rendered source before its first paint. The body is not
    // available yet at document_start, so rendering waits for DOMContentLoaded.
    document.documentElement.style.visibility = "hidden";

    const prettifyAndReveal = async () => {
      try {
        await prettifyJsonDocument();
      } finally {
        document.documentElement.style.removeProperty("visibility");
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        () => void prettifyAndReveal(),
        { once: true },
      );
    } else {
      void prettifyAndReveal();
    }
  },
});
