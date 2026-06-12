import type { UserSettings } from '@jview/definitions';
import { defaultUserSettings } from '../storage';
import type {
  IStorageStrategy,
  UserSettingsChangeListener,
} from './IStorageStrategy';

declare global {
  interface Window {
    __userSettings: UserSettings | undefined;
  }
}

export class MemoryStorageStrategy implements IStorageStrategy {
  private _onSettingsChange: UserSettingsChangeListener | undefined;

  constructor(initialSettings: UserSettings) {
    window.__userSettings = window.__userSettings || initialSettings;
  }

  async loadUserSettings(): Promise<UserSettings> {
    if (window.__userSettings != null) {
      return window.__userSettings;
    }
    return defaultUserSettings;
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    window.__userSettings = settings;
    this._onSettingsChange?.(settings);
  }

  subscribeToUserSettingsChanges(
    onSettingsChange: UserSettingsChangeListener,
  ): () => void {
    this._onSettingsChange = onSettingsChange;
    return () => {
      this._onSettingsChange = undefined;
    };
  }
}
