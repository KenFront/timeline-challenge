import { test, expect } from '@playwright/test';
import { mainPage } from "../constant";

test('has title', async ({ page }) => {
  await page.goto(mainPage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Phase/);
});

test('get started link', async ({ page }) => {
  await page.goto(mainPage);

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Phase Timeline Challenge' })).toBeVisible();
});
