import type { UserSettings } from "@jview/definitions";
import type { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { StorageProvider } from "./StorageProvider";
import { MemoryStorageStrategy } from "./strategies/MemoryStorageStrategy";

type MemoryStorageProps = {
  children: ComponentChildren;
  initialSettings?: UserSettings;
};

const defaultTestUserSettings: UserSettings = {
  wordWrap: false,
};

export const MemoryStorage = ({
  children,
  initialSettings = defaultTestUserSettings,
}: MemoryStorageProps) => {
  const strategy = useMemo(
    () => new MemoryStorageStrategy(initialSettings),
    [initialSettings],
  );

  return <StorageProvider strategy={strategy}>{children}</StorageProvider>;
};
