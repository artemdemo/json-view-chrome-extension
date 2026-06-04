import { FC, PropsWithChildren, useMemo } from "react";
import { StorageProvider } from "./StorageProvider";
import { BrowserStorageStrategy } from "./strategies/BrowserStorageStrategy";

export const BrowserStorage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StorageProvider strategy={useMemo(() => new BrowserStorageStrategy(), [])}>
      {children}
    </StorageProvider>
  );
};
