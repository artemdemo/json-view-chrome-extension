import type { UserSettings } from '@jview/definitions';
import type { IStorageStrategy } from './IStorageStrategy';

export class MemoryStorageStrategy implements IStorageStrategy {
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
