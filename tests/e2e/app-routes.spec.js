import { test, expect } from "@playwright/test";

test("landing page renders core hero content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Draw, Copy, and Paste" })).toBeVisible();
  await expect(page.getByText("Free and open source")).toBeVisible();
});

test("user can navigate from landing page to editor", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Try it for yourself/i }).click();
  await expect(page).toHaveURL(/\/editor$/);
});

test("templates page shows template section", async ({ page }) => {
  await page.goto("/templates");
  await expect(page.getByRole("heading", { name: "Database schema templates" })).toBeVisible();
});

test("unknown route shows not found guidance", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText("hey there!")).toBeVisible();
  await expect(page.getByRole("link", { name: "docs" })).toBeVisible();
});
