import type { Page } from '@playwright/test';
import { createBrowserDriver } from './browserDriver';

export const setupDriver = ({ page }: { page: Page }) => {
  return {
    browser: createBrowserDriver({ page }),
  };
};
