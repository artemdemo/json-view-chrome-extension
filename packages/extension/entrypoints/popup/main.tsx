import { Popup } from "@jview/popup";
import { BrowserStorage } from "@jview/storage";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserStorage>
      <Popup />
    </BrowserStorage>
  </React.StrictMode>,
);
