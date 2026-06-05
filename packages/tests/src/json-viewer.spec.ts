import { expect, test } from '@playwright/test';

test('renders highlighted JSON content', async ({ page }) => {
  await page.goto('/entries/json-viewer.html');

  const code = page.locator('pre code');

  await expect(code).toContainText('"title": "Example JSON"');
  await expect(code).toContainText('"count": 2');
  await expect(code).toContainText('"active": true');
  await expect(code).toContainText('"optional": null');

  await expect(
    page.getByRole('link', { name: 'https://example.com/json-viewer' }),
  ).toHaveAttribute('href', 'https://example.com/json-viewer');
  await expect(page.locator('pre')).toHaveClass(/json-viewer-pre--wrap/);
});
