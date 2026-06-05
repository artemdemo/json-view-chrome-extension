import type { UserSettings } from '@jview/definitions';
import type { IStorageStrategy } from './IStorageStrategy';

export class MemoryStorageStrategy implements IStorageStrategy {
  #settings: UserSettings;

  constructor(initialSettings: UserSettings) {
    this.#settings = initialSettings;
  }

  async loadUserSettings(): Promise<UserSettings> {
    return this.#settings;
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    this.#settings = settings;
  }
}
