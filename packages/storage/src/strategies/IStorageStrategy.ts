import type { UserSettings } from '@jview/definitions';
import type { UserSettingsChangeListener } from '../StorageProvider';

export interface IStorageStrategy {
  initialSettings?: UserSettings;
  loadUserSettings(): Promise<UserSettings>;
  saveUserSettings(settings: UserSettings): Promise<void>;
  subscribeToUserSettingsChanges?(
    listener: UserSettingsChangeListener,
  ): () => void;
}
