import { test, expect } from "@playwright/test";
import { loginAsAdmin, logoutAdmin } from "./helpers/admin-helpers";

test.describe("管理者ダッシュボード", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("管理者ダッシュボードの表示確認", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("管理者ダッシュボード");

    await expect(page.locator("text=経歴編集")).toBeVisible();
    await expect(page.locator("text=趣味編集")).toBeVisible();
    await expect(page.locator("text=スキル編集")).toBeVisible();
    await expect(page.locator("text=実績編集")).toBeVisible();
  });

  test("スキルタグ管理ページへの遷移", async ({ page }) => {
    await page.click("text=スキル編集");

    await expect(page).toHaveURL("/admin/skill-tags");
    await expect(page.locator("h1")).toContainText("スキルタグ管理");
  });

  test("管理者ログアウト", async ({ page }) => {
    await logoutAdmin(page);
  });

  test("管理者ヘッダーの表示確認", async ({ page }) => {
    const adminHeader = page.getByLabel("管理者ヘッダー");
    await expect(adminHeader).toBeVisible();
    await expect(adminHeader.locator("h1")).toContainText(
      "管理者ダッシュボード"
    );
  });
});
