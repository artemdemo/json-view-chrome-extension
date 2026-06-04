import { BrowserStorage } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { createRoot } from "react-dom/client";

export function renderJsonViewer(
  jsonStr: string,
  source: string,
) {
  document.documentElement.classList.add("json-view-extension-document");

  const root = document.createElement("div");

  document.body.replaceChildren(root);
  createRoot(root).render(
    <BrowserStorage>
      <JsonViewer jsonStr={jsonStr} source={source} />
    </BrowserStorage>,
  );
}
