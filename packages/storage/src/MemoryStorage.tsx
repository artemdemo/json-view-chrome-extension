import type { UserSettings } from "@jview/definitions";
import type { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { IStorageStrategy } from "./strategies/IStorageStrategy";
import { StorageProvider } from "./StorageProvider";

type MemoryStorageProps = {
  children: ComponentChildren;
  initialSettings?: UserSettings;
};

const defaultTestUserSettings: UserSettings = {
  wordWrap: false,
};

// ToDo: Should be in `@jview/storage`
class MemoryStorageStrategy implements IStorageStrategy {
  readonly initialSettings: UserSettings;

  #settings: UserSettings;

  constructor(initialSettings: UserSettings) {
    this.initialSettings = initialSettings;
    this.#settings = initialSettings;
  }

  async loadUserSettings(): Promise<UserSettings> {
    return this.#settings;
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    this.#settings = settings;
  }
}

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
