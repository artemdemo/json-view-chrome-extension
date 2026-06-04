import { Popup } from "@jview/popup";
import { StorageProvider } from "@jview/storage";
import { BrowserStorageStrategy } from "@jview/storage";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StorageProvider strategy={new BrowserStorageStrategy()}>
      <Popup />
    </StorageProvider>
  </React.StrictMode>,
);
