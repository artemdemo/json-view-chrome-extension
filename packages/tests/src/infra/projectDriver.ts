import type { UserSettings } from '@jview/definitions';
import type { Page } from '@playwright/test';

export const createProjectDriver = ({ page }: { page: Page }) => {
  return {
    setSettings: async (settings: UserSettings) => {
      await page.evaluate(
        (s) => window.__sendEvent?.({ settings: s }),
        settings,
      );
    },
  };
};
