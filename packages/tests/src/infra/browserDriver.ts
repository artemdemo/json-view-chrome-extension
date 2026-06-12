import type { Page } from '@playwright/test';

type ViewName = 'view';

export const createBrowserDriver = ({ page }: { page: Page }) => {
  return {
    open: async (viewName: ViewName) => {
      await page.goto(`/entry.html?view=${viewName}`);
    },
  };
};
