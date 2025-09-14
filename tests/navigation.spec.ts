import { test, expect } from "@playwright/test";

test.describe("ナビゲーション", () => {
  test("ロゴクリックでホームページに戻る", async ({ page }) => {
    await page.goto("/career");

    const headerLogo = page.locator("#header-logo");
    await expect(headerLogo).toBeVisible();

    await headerLogo.click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("鈴木 宏尭");
  });

  test("全ページ間のナビゲーションが正常に動作する", async ({ page }) => {
    // デスクトップサイズに設定
    await page.setViewportSize({ width: 1200, height: 800 });

    // ホームページから開始
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("鈴木 宏尭");

    // 経歴ページへ移動
    await page.click('nav a:has-text("経歴")');
    await expect(page).toHaveURL("/career");
    await expect(page.locator("h1")).toContainText("経歴");

    // 趣味ページへ移動
    await page.click('nav a:has-text("趣味")');
    await expect(page).toHaveURL("/hobbies");
    await expect(page.locator("h1")).toContainText("趣味");

    // 自己PRページへ移動
    await page.click('nav a:has-text("自己PR")');
    await expect(page).toHaveURL("/self-pr");
    await expect(page.locator("h1")).toContainText("自己PR");

    // ホームページに戻る
    await page.click('nav a:has-text("ホーム")');
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("鈴木 宏尭");
  });

  test("モバイルナビゲーションが正常に動作する", async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // モバイルメニューボタンを探す
    const mobileMenuButton = page.locator(
      "button[aria-label='モバイルメニューを開く']"
    );

    // モバイルメニューボタンが存在する場合のテスト
    if ((await mobileMenuButton.count()) > 0) {
      // メニューボタンをクリック
      await mobileMenuButton.first().click();

      // モバイルメニューが表示されることを確認
      const mobileMenu = page.locator('[aria-label="モバイルメニュー"]');
      await expect(mobileMenu.first()).toBeVisible();

      // モバイルメニュー内のリンクをクリック
      await page.click('[aria-label="モバイルメニュー"] a[href="/career"]');
      await expect(page).toHaveURL("/career");
    }
  });
});
