import { type FC, type PropsWithChildren } from 'react';
import { useStorage } from '@jview/storage';
import { UserSettingsContext } from '../user-settings';

type UserSettingsProps = PropsWithChildren;

export const UserSettingsProvider: FC<UserSettingsProps> = ({
  children,
}) => {
  const settings = useStorage();

  return (
    <UserSettingsContext.Provider value={settings}>
      {children}
    </UserSettingsContext.Provider>
  );
};
