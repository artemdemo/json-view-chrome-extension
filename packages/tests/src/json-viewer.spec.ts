import { expect, test } from '@playwright/test';
import { setupDriver } from './infra/driver';

test.describe('JSON view', () => {
  test('renders highlighted JSON content (light)', async ({ page }) => {
    const { browser } = setupDriver({ page });
    await browser.open('view');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });

  // test('renders highlighted JSON content with wordwrap (light)', async ({ page }) => {
  //   await page.goto('/entries/json-viewer.html?wordwrap=true');
  //   await page.emulateMedia({ colorScheme: 'light' });
  //   await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  // });

  test('renders highlighted JSON content (dark)', async ({ page }) => {
    const { browser } = setupDriver({ page });
    await browser.open('view');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });
});
