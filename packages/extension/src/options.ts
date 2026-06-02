import type { UserSettingsValue } from '@jview/definitions';
import { DEFAULT_USER_SETTINGS } from '@jview/view';
import { browser } from 'wxt/browser';

export const DEFAULT_JSON_VIEWER_OPTIONS = DEFAULT_USER_SETTINGS;

export const WORD_WRAP_STORAGE_KEY = 'jsonViewer.wordWrap';

export async function getJsonViewerOptions(): Promise<UserSettingsValue> {
  // ToDo: zod it
  const values = await browser.storage?.local?.get(WORD_WRAP_STORAGE_KEY);

  return {
    wordWrap: values[WORD_WRAP_STORAGE_KEY] === true,
  };
}

export async function setWordWrapOption(wordWrap: boolean): Promise<void> {
  await browser.storage?.local?.set({
    [WORD_WRAP_STORAGE_KEY]: wordWrap,
  });
}

export function getWordWrapFromStorageChange(
  changes: Record<string, { newValue?: unknown }>,
): boolean | undefined {
  if (!(WORD_WRAP_STORAGE_KEY in changes)) {
    return undefined;
  }

  return changes[WORD_WRAP_STORAGE_KEY]?.newValue === true;
}
