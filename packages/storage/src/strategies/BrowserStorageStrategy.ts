import type { UserSettings } from '@jview/definitions';
import { type Browser, browser } from 'wxt/browser';
import {
  defaultUserSettings,
  parseUserSettings,
  USER_SETTINGS_STORAGE_KEY,
} from '../storage';
import type {
  IStorageStrategy,
  UserSettingsChangeListener,
} from './IStorageStrategy';

export class BrowserStorageStrategy implements IStorageStrategy {
  async saveUserSettings(settings: UserSettings): Promise<void> {
    try {
      await browser.storage?.local?.set({
        [USER_SETTINGS_STORAGE_KEY]: settings,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async loadUserSettings(): Promise<UserSettings> {
    try {
      const data = await browser.storage?.local?.get(USER_SETTINGS_STORAGE_KEY);
      return parseUserSettings(data);
    } catch (e) {
      console.error(e);
    }
    return defaultUserSettings;
  }

  subscribeToUserSettingsChanges(
    onSettingsChange: UserSettingsChangeListener,
  ): () => void {
    const handleStorageChange = (
      changes: {
        [key: string]: Browser.storage.StorageChange;
      },
      areaName: Browser.storage.AreaName,
    ) => {
      if (areaName !== 'local') {
        return;
      }

      if (!(USER_SETTINGS_STORAGE_KEY in changes)) {
        return;
      }

      onSettingsChange(
        parseUserSettings(changes[USER_SETTINGS_STORAGE_KEY].newValue),
      );
    };

    browser.storage?.onChanged?.addListener(handleStorageChange);

    return () => {
      browser.storage?.onChanged?.removeListener(handleStorageChange);
    };
  }
}
