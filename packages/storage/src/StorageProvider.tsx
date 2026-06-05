import type { UserSettings } from "@jview/definitions";
import { createContext, type ComponentChildren } from "preact";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "preact/hooks";
import { defaultUserSettings } from "./storage";
import { IStorageStrategy } from "./strategies/IStorageStrategy";

export type UserSettingsChangeListener = (settings: UserSettings) => void;

export type StorageContextValue = {
  settings: UserSettings;
  saveUserSettings: (settings: UserSettings) => Promise<void>;
};

type StorageProviderProps = {
  children: ComponentChildren;
  strategy: IStorageStrategy;
};

export const StorageContext = createContext<StorageContextValue | undefined>(
  undefined,
);

export function StorageProvider({ children, strategy }: StorageProviderProps) {
  const [settings, setSettings] = useState<UserSettings>(
    () => strategy.initialSettings ?? defaultUserSettings,
  );

  useEffect(() => {
    let isActive = true;

    strategy
      .loadUserSettings()
      .then((loadedSettings) => {
        if (isActive) {
          setSettings(loadedSettings);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    const unsubscribe = strategy.subscribeToUserSettingsChanges?.(
      (nextSettings) => {
        if (isActive) {
          setSettings(nextSettings);
        }
      },
    );

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, [strategy]);

  const saveUserSettings = useCallback(
    async (nextSettings: UserSettings) => {
      await strategy.saveUserSettings(nextSettings);
      setSettings(nextSettings);
    },
    [strategy],
  );

  const value = useMemo(
    () => ({
      settings,
      saveUserSettings,
    }),
    [settings, saveUserSettings],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
