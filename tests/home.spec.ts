import { test, expect } from "@playwright/test";

test.describe("ホームページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ページが正常に表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/トップ | 鈴木宏尭/);
    await expect(page.locator("h1")).toContainText("鈴木 宏尭");
  });

  test("ヘッダーナビゲーションが正常に動作する", async ({ page }) => {
    const headerNavigation = page.locator("#header-navigation");
    await expect(headerNavigation).toBeVisible();

    const activeLink = headerNavigation.locator('a:has-text("ホーム")').first();
    const classAttribute = await activeLink.getAttribute("class");
    expect(classAttribute).toContain("bg-blue-50");
    expect(classAttribute).toContain("text-blue-600");
  });

  test("プロフィール画像が表示される", async ({ page }) => {
    const keyVisual = page.locator("#key-visual");
    await expect(keyVisual).toBeVisible();

    const profileImage = keyVisual.locator('img[alt*="プロフィール写真"]');
    await expect(profileImage).toBeVisible();
    await expect(profileImage).toHaveAttribute("src", /main\.jpg/);
  });

  test("自己紹介セクションが表示される", async ({ page }) => {
    const selfIntroduction = page.locator("#self-introduction");
    await expect(selfIntroduction).toBeVisible();
  });

  test("SNSボタンが機能する", async ({ page }) => {
    const snsBtn = page.locator("#sns-btn");
    await expect(snsBtn).toBeVisible();

    const xButton = page.locator('a[href*="x.com"]');
    await expect(xButton).toBeVisible();
    await expect(xButton).toHaveAttribute("target", "_blank");

    const instagramButton = page.locator('a[href*="instagram.com"]');
    await expect(instagramButton).toBeVisible();
    await expect(instagramButton).toHaveAttribute("target", "_blank");
  });

  test("ナビゲーションカードが表示される", async ({ page }) => {
    const navigationCards = page.locator("#navigation-cards");
    await expect(navigationCards).toBeVisible();

    await expect(navigationCards.locator('a[href="/career"]')).toBeVisible();
    await expect(navigationCards.locator('a[href="/hobbies"]')).toBeVisible();
    await expect(navigationCards.locator('a[href="/self-pr"]')).toBeVisible();
  });
});
