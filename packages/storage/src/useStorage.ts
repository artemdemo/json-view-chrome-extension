import { useContext } from 'preact/hooks';
import { StorageContext } from './StorageProvider';

export const useStorage = () => {
  const storage = useContext(StorageContext);

  if (storage === undefined) {
    throw new Error('useStorage must be used within a StorageProvider.');
  }

  return storage;
};
