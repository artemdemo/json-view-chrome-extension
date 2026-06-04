import { StorageProvider } from "@jview/storage";
import { BrowserStorageStrategy } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { createRoot } from "react-dom/client";

export function renderJsonViewer(
  jsonStr: string,
  json: unknown,
  source: string,
) {
  document.documentElement.classList.add("json-view-extension-document");

  const root = document.createElement("div");
  root.id = "json-viewer-react-root";

  document.body.replaceChildren(root);
  createRoot(root).render(
    <StorageProvider strategy={new BrowserStorageStrategy()}>
      <JsonViewer json={json} jsonStr={jsonStr} source={source} />
    </StorageProvider>,
  );
}
