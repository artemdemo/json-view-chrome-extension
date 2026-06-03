import type { UserSettings } from '@jview/definitions';
import { useCallback, useEffect, useState } from 'react';
import { type Browser, browser } from 'wxt/browser';
import {
  defaultUserSettings,
  parseUserSettings,
  USER_SETTINGS_STORAGE_KEY,
} from './storage';

export const useStorage = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultUserSettings);

  const handleStorageChange = useCallback(
    (
      changes: {
        [key: string]: Browser.storage.StorageChange;
      },
      areaName: Browser.storage.AreaName,
    ) => {
      if (areaName !== 'local') {
        return;
      }

      if (!(USER_SETTINGS_STORAGE_KEY in changes)) {
        return undefined;
      }

      setSettings((currentSettings) => ({
        ...currentSettings,
        ...parseUserSettings(changes[USER_SETTINGS_STORAGE_KEY]),
      }));
    },
    [],
  );

  useEffect(() => {
    browser.storage.onChanged.addListener(handleStorageChange);

    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [handleStorageChange]);

  return settings;
};
