import { MemoryStorage } from "@jview/storage";
import { JsonViewer } from "@jview/view";
import { render } from "preact";

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
const wordWrap = new URLSearchParams(window.location.search).has("wordwrap");

if (root === null) {
  throw new Error("Missing root element.");
}

render(
  <MemoryStorage initialSettings={{ wordWrap }}>
    <JsonViewer json={json} source={JSON.stringify(json)} />
  </MemoryStorage>,
  root,
);
