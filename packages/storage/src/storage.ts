import { type UserSettings, UserSettingsSchema } from '@jview/definitions';
import { browser } from 'wxt/browser';

export const USER_SETTINGS_STORAGE_KEY = 'jsonViewer.userSettings';

export const defaultUserSettings: UserSettings = {
  wordWrap: false,
};

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  try {
    await browser.storage?.local?.set({
      [USER_SETTINGS_STORAGE_KEY]: settings,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function loadUserSettings(): Promise<UserSettings> {
  try {
    const data = await browser.storage?.local?.get(USER_SETTINGS_STORAGE_KEY);
    return parseUserSettings(data);
  } catch (e) {
    console.error(e);
  }
  return defaultUserSettings;
}

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
