import type { UserSettingsValue } from '@jview/definitions';
import { createContext, useContext } from 'react';

export const DEFAULT_USER_SETTINGS: UserSettingsValue = {
  wordWrap: false,
};

export const UserSettingsContext = createContext<UserSettingsValue>(
  DEFAULT_USER_SETTINGS,
);

export function useUserSettings(): UserSettingsValue {
  return useContext(UserSettingsContext);
}
