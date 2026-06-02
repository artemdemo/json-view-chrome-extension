import { createContext, useContext } from 'react';

export type UserSettingsValue = {
  wordWrap: boolean;
};

export const DEFAULT_USER_SETTINGS: UserSettingsValue = {
  wordWrap: false,
};

export const UserSettingsContext = createContext<UserSettingsValue>(
  DEFAULT_USER_SETTINGS,
);

export function useUserSettings(): UserSettingsValue {
  return useContext(UserSettingsContext);
}
