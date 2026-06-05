import { Popup } from "@jview/popup";
import { MemoryStorage } from "@jview/storage";
import { render } from "preact";

const root = document.getElementById("root");

if (root === null) {
  throw new Error("Missing root element.");
}

render(
  <MemoryStorage>
    <Popup />
  </MemoryStorage>,
  root,
);
