import { expect, test } from '@playwright/test';
import { setupDriver } from './infra/driver';

test.describe('popup', () => {
  test('renders the popup settings UI', async ({ page }) => {
    const { browser } = setupDriver({ page });
    await browser.open('popup');

    await expect(
      page.getByRole('heading', { name: 'JSON View' }),
    ).toBeVisible();
    await expect(
      page.getByText('Active on browser documents served as application/json.'),
    ).toBeVisible();

    const wordWrap = page.getByRole('checkbox', { name: 'Word Wrap' });

    await expect(wordWrap).toBeVisible();
    await expect(wordWrap).not.toBeChecked();

    await wordWrap.check();

    await expect(wordWrap).toBeChecked();
  });

  test('test design (light)', async ({ page }) => {
    const { browser } = setupDriver({ page });
    await browser.open('popup');

    await page.setViewportSize({ width: 400, height: 300 });
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });

  test('test design (dark)', async ({ page }) => {
    const { browser } = setupDriver({ page });
    await browser.open('popup');

    await page.setViewportSize({ width: 400, height: 300 });
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });
});
