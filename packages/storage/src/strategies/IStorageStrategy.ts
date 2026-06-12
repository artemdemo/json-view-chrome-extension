import type { UserSettings } from '@jview/definitions';

export type UserSettingsChangeListener = (settings: UserSettings) => void;

export interface IStorageStrategy {
  initialSettings?: UserSettings;
  loadUserSettings(): Promise<UserSettings>;
  saveUserSettings(settings: UserSettings): Promise<void>;
  subscribeToUserSettingsChanges(
    listener: UserSettingsChangeListener,
  ): () => void;
}
