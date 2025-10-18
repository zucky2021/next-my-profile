import { test, expect } from "@playwright/test";
import {
  loginAsAdmin,
  navigateToSkillTagsPage,
  createSkillTag,
  deleteSkillTag,
  editSkillTag,
} from "./helpers/admin-helpers";

test.describe("スキルタグ管理機能", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateToSkillTagsPage(page);
  });

  test("スキルタグ管理ページの表示確認", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("スキルタグ管理");
    await expect(
      page.locator("text=スキルタグの追加・編集・削除を行います")
    ).toBeVisible();
    const tagForm = page.getByLabel("スキルタグフォーム");
    await expect(tagForm.locator('input[id="name"]')).toBeVisible();
    await expect(tagForm.locator('button[type="submit"]')).toBeVisible();
  });

  test("スキルタグのCRUD操作", async ({ page }) => {
    const newTagName = `Test tag ${Date.now()}`;
    const updatedTagName = `${newTagName} Updated`;
    const skillTagList = page.getByLabel("スキルタグ一覧");

    await test.step("スキルタグの作成", async () => {
      await createSkillTag(page, newTagName);
      await expect(skillTagList.locator(`text=${newTagName}`)).toBeVisible();
    });

    await test.step("スキルタグの編集", async () => {
      await editSkillTag(page, newTagName, updatedTagName);
      await expect(
        skillTagList.locator(`text=${updatedTagName}`)
      ).toBeVisible();
    });

    await test.step("スキルタグの削除", async () => {
      await deleteSkillTag(page, updatedTagName);
      await expect(
        skillTagList.locator(`text=${updatedTagName}`)
      ).not.toBeVisible();
    });
  });
});
