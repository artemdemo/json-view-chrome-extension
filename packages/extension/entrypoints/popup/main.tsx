import { Popup } from "@jview/popup";
import { BrowserStorage } from "@jview/storage";
import { render } from "preact";

render(
  <BrowserStorage>
    <Popup />
  </BrowserStorage>,
  document.getElementById("root")!,
);
