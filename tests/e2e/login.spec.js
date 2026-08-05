const { test, expect } = require('@playwright/test');

test('smoke - load login page', async ({ page }) => {
  await page.goto('/');
  // if redirected to /login, check presence of sign in
  if (page.url().includes('/login')) {
    await expect(page.locator('text=Sign in to WA‑AI')).toBeVisible();
  } else {
    // already logged in (CI env) - ensure dashboard loads
    await expect(page).toHaveURL(/(dashboard|\/$)/);
  }
});
