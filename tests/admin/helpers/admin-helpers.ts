import { Page, expect } from "@playwright/test";

/**
 * 管理者ログインのヘルパー関数
 */
export const loginAsAdmin = async (page: Page) => {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  await page.goto("/auth/signin");

  await page.fill('input[name="username"]', adminUsername);
  await page.fill('input[name="password"]', adminPassword);

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("/admin");

  await expect(page.locator("h1")).toContainText("管理者ダッシュボード");
};

/**
 * スキルタグ管理ページに遷移するヘルパー関数
 */
export const navigateToSkillTagsPage = async (page: Page) => {
  await page.goto("/admin/skill-tags");
  await expect(page.locator("h1")).toContainText("スキルタグ管理");
};

/**
 * 管理者ログアウトのヘルパー関数
 */
export const logoutAdmin = async (page: Page) => {
  const logoutBtn = page.getByLabel("管理者ログアウト");

  try {
    // 通常のクリックを試行
    await logoutBtn.click({ timeout: 5000 });
  } catch (error) {
    console.log("通常のクリックが失敗、forceオプションで再試行");
    // forceオプションでクリック
    await logoutBtn.click({ force: true });
  }

  await page.waitForResponse((response) => {
    return (
      response.url().includes("/api/auth/signout") && response.status() === 200
    );
  });
  await page.waitForURL((url) => url.pathname === "/");
};

/**
 * スキルタグを作成するヘルパー関数
 */
export const createSkillTag = async (page: Page, tagName: string) => {
  const tagForm = page.getByLabel("スキルタグフォーム");
  await tagForm.getByLabel("スキルタグ名").fill(tagName);
  await tagForm.getByRole("button", { name: "追加" }).click();
};

/**
 * スキルタグを編集するヘルパー関数
 */
export const editSkillTag = async (
  page: Page,
  tagName: string,
  newTagName: string
) => {
  const skillTagList = page.getByLabel("スキルタグ一覧");
  const editBtn = skillTagList.getByLabel(`${tagName} 編集`);
  await editBtn.click();

  const form = page.getByLabel("スキルタグフォーム");
  await form.getByRole("textbox", { name: "スキルタグ名" }).fill(newTagName);
  await form.getByRole("button", { name: "更新" }).click();
};

/**
 * スキルタグを削除するヘルパー関数
 */
export const deleteSkillTag = async (page: Page, tagName: string) => {
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("このスキルタグを削除しますか？");
    await dialog.accept();
  });

  const skillTagList = page.getByLabel("スキルタグ一覧");
  const delBtn = skillTagList.getByLabel(`${tagName} 削除`);
  await delBtn.click();
};
