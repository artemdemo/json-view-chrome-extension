import { BrowserStorage } from "@jview/storage";
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
    <BrowserStorage>
      <JsonViewer json={json} jsonStr={jsonStr} source={source} />
    </BrowserStorage>,
  );
}
