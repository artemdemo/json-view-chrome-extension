import type { UserSettings } from '@jview/definitions';
import { createContext, useContext } from 'react';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  wordWrap: false,
};

export const UserSettingsContext = createContext<UserSettings>(
  DEFAULT_USER_SETTINGS,
);

export function useUserSettings(): UserSettings {
  return useContext(UserSettingsContext);
}
