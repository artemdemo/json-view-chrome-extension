import { type UserSettings, UserSettingsSchema } from '@jview/definitions';

export const USER_SETTINGS_STORAGE_KEY = 'jsonViewer.userSettings';

export const defaultUserSettings: UserSettings = {
  wordWrap: false,
};

export const parseUserSettings = (data: unknown): UserSettings => {
  try {
    const userSettings = UserSettingsSchema.parse(getUserSettingsValue(data));
    return userSettings;
  } catch (e) {
    console.error(e);
  }
  return defaultUserSettings;
};

const getUserSettingsValue = (data: unknown): unknown => {
  if (typeof data === 'string') {
    return JSON.parse(data);
  }

  if (isRecord(data) && USER_SETTINGS_STORAGE_KEY in data) {
    return getUserSettingsValue(data[USER_SETTINGS_STORAGE_KEY]);
  }

  return data;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;
