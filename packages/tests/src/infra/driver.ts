import type { Page } from '@playwright/test';
import { createBrowserDriver } from './browserDriver';
import { createProjectDriver } from './projectDriver';

export const setupDriver = ({ page }: { page: Page }) => {
  return {
    browser: createBrowserDriver({ page }),
    project: createProjectDriver({ page }),
  };
};
