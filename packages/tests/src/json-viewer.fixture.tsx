import { MemoryStorage } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { render } from "preact";

const json = {
  title: "Example JSON",
  count: 2,
  active: true,
  docs: "https://example.com/json-viewer",
  optional: null,
};

const root = document.getElementById("root");

if (root === null) {
  throw new Error("Missing root element.");
}

render(
  <MemoryStorage initialSettings={{ wordWrap: true }}>
    <JsonViewer json={json} source={JSON.stringify(json)} />
  </MemoryStorage>,
  root,
);
