import type { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { StorageProvider } from "./StorageProvider";
import { BrowserStorageStrategy } from "./strategies/BrowserStorageStrategy";

type BrowserStorageProps = {
  children?: ComponentChildren;
};

export const BrowserStorage = ({ children }: BrowserStorageProps) => {
  return (
    <StorageProvider strategy={useMemo(() => new BrowserStorageStrategy(), [])}>
      {children}
    </StorageProvider>
  );
};
