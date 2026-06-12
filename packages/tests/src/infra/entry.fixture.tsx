import { MemoryStorage } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { Popup } from "@jview/popup";
import { render } from "preact";
import { TestBridge } from "./TestBridge";

const json = {
  title: "Example JSON",
  count: 2,
  active: true,
  docs: "https://example.com/json-viewer",
  optional: null,
  longText:
    "The early morning sun pierced through the dense canopy of the ancient forest, casting long, golden beams of light that danced upon the dew-drenched ferns below. A gentle breeze rustled the leaves, carrying with it the earthy scent of damp pine needles and blooming wildflowers.",
};

const root = document.getElementById("root");
const view: string | null = new URLSearchParams(window.location.search).get(
  "view",
);

if (root === null) {
  throw new Error("Missing root element.");
}

render(
  <MemoryStorage>
    {(() => {
      switch (view) {
        case "view":
          return <JsonViewer json={json} source={JSON.stringify(json)} />;
        case "popup":
          return <Popup />;
        default:
          return `Not know view, got "${view}"`;
      }
    })()}
    <TestBridge />
  </MemoryStorage>,
  root,
);
