import { expect, test } from '@playwright/test';

test.describe('JSON view', () => {
  test('renders highlighted JSON content (light)', async ({ page }) => {
    await page.goto('/entries/json-viewer.html');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });

  test('renders highlighted JSON content (dark)', async ({ page }) => {
    await page.goto('/entries/json-viewer.html');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });
});
