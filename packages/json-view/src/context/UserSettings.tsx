import {
  UserSettingsContext,
} from '@jview/view';
import { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import { browser } from 'wxt/browser';
import { UserSettingsValue } from '@jview/definitions';
import { getWordWrapFromStorageChange } from '../../../extension/src/options';

type UserSettingsProps = PropsWithChildren<{
  initialSettings: UserSettingsValue;
}>;

export const UserSettings: FC<UserSettingsProps> = ({
  children,
  initialSettings,
}) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const handleStorageChange: Parameters<
      typeof browser.storage.onChanged.addListener
    >[0] = (changes, areaName) => {
      if (areaName !== 'local') {
        return;
      }

      const wordWrap = getWordWrapFromStorageChange(changes);
      if (wordWrap === undefined) {
        return;
      }

      setSettings((currentSettings) => ({
        ...currentSettings,
        wordWrap,
      }));
    };

    browser.storage.onChanged.addListener(handleStorageChange);

    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return (
    <UserSettingsContext.Provider value={settings}>
      {children}
    </UserSettingsContext.Provider>
  );
};
