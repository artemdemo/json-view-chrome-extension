import type { UserSettings } from '@jview/definitions';
import type { IStorageStrategy } from './IStorageStrategy';

declare global {
  interface Window {
    __strategy: UserSettings;
  }
}

export class MemoryStorageStrategy implements IStorageStrategy {
  constructor(initialSettings: UserSettings) {
    window.__strategy = window.__strategy || initialSettings;
  }

  async loadUserSettings(): Promise<UserSettings> {
    return window.__strategy;
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    window.__strategy = settings;
  }
}
