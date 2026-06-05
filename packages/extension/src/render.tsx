import { BrowserStorage } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { render } from "preact";

const MAX_SAFE_SIZE = 2 * 1024 * 1024; // 2MB

export const prettifyJsonDocument = async () => {
  const source = getDocumentText(document);
  if (source.trim() === "") {
    return;
  }

  if (source.length > MAX_SAFE_SIZE) {
    console.warn("JSON document is too large to prettify safely.");
    return;
  }

  try {
    const json = JSON.parse(source);

    renderJsonViewer(json, source);
  } catch (e) {
    console.error(`Can't parse provided JSON`);
    console.error(e);
  }
};

const getDocumentText = (doc: Document): string => {
  const { body } = doc;
  if (!body) {
    return "";
  }

  const onlyChild = body.children.length === 1 ? body.firstElementChild : null;
  if (onlyChild?.tagName === "PRE") {
    return onlyChild.textContent ?? "";
  }

  return body.textContent ?? "";
};

const renderJsonViewer = (json: unknown, source: string) => {
  const root = document.createElement("div");

  document.body.replaceChildren(root);

  render(
    <BrowserStorage>
      <JsonViewer json={json} source={source} />
    </BrowserStorage>,
    root,
  );
};
