import { test, expect } from "@playwright/test";

test.describe("経歴ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/career");
  });

  test("ページが正常に表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/経歴 | 鈴木宏尭/);
    await expect(page.locator("h1")).toContainText("経歴");
  });

  test("転職歴セクションが表示される", async ({ page }) => {
    const careerSection = page.locator("#career");
    await expect(careerSection).toBeVisible();
    await expect(careerSection.locator("h2")).toContainText("転職歴");

    const careerList = careerSection.locator("ul");
    const careerItems = careerList.locator("li");
    const count = await careerItems.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCareer = careerItems.first();
    await expect(firstCareer).toBeVisible();
    await expect(firstCareer.locator("h3")).toBeVisible();

    const dateElements = firstCareer.locator(
      "text=/\\d{4}\\/\\d{1,2}\\/\\d{1,2}/"
    );
    await expect(dateElements.first()).toBeVisible();

    const companyLinks = firstCareer.locator('a:has-text("企業情報")');
    await expect(companyLinks).toBeVisible();
    await expect(companyLinks).toHaveAttribute("target", "_blank");
  });

  test("業務実績セクションが表示される", async ({ page }) => {
    const achievementSection = page.locator("#achievement");
    await expect(achievementSection).toBeVisible();
    await expect(achievementSection.locator("h2")).toContainText(
      "主要業務実績"
    );

    // aria-labelを使用した正しいセレクター
    const achievementList = achievementSection.getByLabel("主要業務実績リスト");
    await expect(achievementList).toBeVisible();

    const achievementItems = achievementList.getByLabel("主要業務実績");
    const firstAchievement = achievementItems.first();
    await expect(firstAchievement).toBeVisible();

    const dateElements = firstAchievement.locator(
      "text=/\\d{4}\\/\\d{1,2}\\/\\d{1,2}/"
    );
    await expect(dateElements).toBeVisible();

    const skillTagList = achievementSection.getByLabel("スキルタグリスト");
    const skillTags = skillTagList.getByLabel("スキルタグ");
    if ((await skillTags.count()) > 0) {
      await expect(skillTags.first()).toBeVisible();
    }
  });

  test("技術スキルセクションが表示される", async ({ page }) => {
    const techSkillSection = page.locator("#tech-skill");
    await expect(techSkillSection).toBeVisible();
    await expect(techSkillSection.locator("h2")).toContainText("技術スキル");

    const frontendSection = techSkillSection.locator("#frontend");
    await expect(frontendSection).toBeVisible();
    await expect(frontendSection.locator("h3")).toContainText("フロントエンド");

    const backendSection = techSkillSection.locator("#backend");
    await expect(backendSection).toBeVisible();
    await expect(backendSection.locator("h3")).toContainText("バックエンド");

    const infrastructureSection = techSkillSection.locator("#infrastructure");
    await expect(infrastructureSection).toBeVisible();
    await expect(infrastructureSection.locator("h3")).toContainText(
      "インフラ・DevOps"
    );

    const databaseSection = techSkillSection.locator("#database");
    await expect(databaseSection).toBeVisible();
    await expect(databaseSection.locator("h3")).toContainText("データベース");
  });
});
