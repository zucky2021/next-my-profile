import { test, expect } from "@playwright/test";

test.describe("趣味ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hobbies");
  });

  test("ページが正常に表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/趣味 \| 鈴木宏尭/);
    await expect(page.locator("h1")).toContainText("趣味");
  });

  test("趣味一覧が正しく表示される", async ({ page }) => {
    const hobbies = page.getByLabel("趣味一覧");

    const hobbyCards = hobbies.getByLabel("趣味カード");
    const count = await hobbyCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const firstHobby = hobbyCards.first();
    await expect(firstHobby.locator("h2")).toBeVisible();
  });

  test("趣味の統計が正しく表示される", async ({ page }) => {
    const statsSection = page.getByLabel("趣味の統計");
    await expect(statsSection).toBeVisible();
    await expect(statsSection.locator("h2")).toContainText("趣味の統計");

    const hobbyCntElem = statsSection.getByLabel("主要な趣味数");
    const hobbyCntTxt = await hobbyCntElem.textContent();
    const hobbyCnt = parseInt(hobbyCntTxt || "0");
    expect(hobbyCnt).toBeGreaterThan(1);

    const skillCntElem = statsSection.getByLabel("関連スキル数");
    const skillCntTxt = await skillCntElem.textContent();
    const skillCnt = parseInt(skillCntTxt || "0");
    expect(skillCnt).toBeGreaterThan(1);
  });

  test("趣味と仕事の関係セクションが表示される", async ({ page }) => {
    const relationSection = page.getByLabel("趣味と仕事の関係");
    await expect(relationSection).toBeVisible();
    await expect(relationSection.locator("h2")).toContainText(
      "趣味と仕事の関係"
    );

    const skillElem = relationSection.getByLabel("趣味から得られるスキル");
    await expect(skillElem).toBeVisible();
    await expect(skillElem).toContainText("趣味から得られるスキル");

    const applicationElem = relationSection.getByLabel("仕事への活かし方");
    await expect(applicationElem).toBeVisible();
    await expect(applicationElem).toContainText("仕事への活かし方");
  });

  test("今後の目標セクションが表示される", async ({ page }) => {
    const goalSection = page.getByLabel("今後の目標");
    await expect(goalSection).toBeVisible();
    await expect(goalSection.locator("h2")).toContainText("今後の目標");

    const shortTermSection = goalSection.getByLabel("短期目標");
    await expect(shortTermSection).toBeVisible();
    await expect(shortTermSection).toContainText("短期目標（3ヶ月）");

    const longTermSection = goalSection.getByLabel("長期目標");
    await expect(longTermSection).toBeVisible();
    await expect(longTermSection).toContainText("長期目標（1年）");
  });
});
