import { expect, test } from '@playwright/test';

test.describe('popup', () => {
  test('renders the popup settings UI', async ({ page }) => {
    await page.goto('/entries/popup.html');

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
    await page.goto('/entries/popup.html');
    await page.setViewportSize({ width: 400, height: 300 });
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  });
});
