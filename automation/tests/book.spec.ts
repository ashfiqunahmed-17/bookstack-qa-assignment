import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BookPage } from '../pages/BookPage';
import { uniqueName } from '../utils/config';
import { snap } from '../utils/screenshot';

test.describe('Create Book', () => {
  test.beforeEach(async () => {
    await allure.epic('BookStack Demo');
    await allure.feature('Book management');
  });

  test('AUT-B02 create a book with a valid name', async ({ page }, testInfo) => {
    await allure.severity('critical');
    const book = new BookPage(page);
    const name = uniqueName('Auto Book');
    await book.openCreateForm();
    await book.create(name);
    await expect(page).toHaveURL(/\/books\//);
    await expect(page.locator('h1').first()).toContainText(name);
    await snap(page, testInfo, 'book created');
    await book.deleteCurrentBook();
  });

  test('AUT-B03 empty name is rejected', async ({ page }, testInfo) => {
    await allure.severity('normal');
    const book = new BookPage(page);
    await book.openCreateForm();
    await book.create('');
    await expect(page).not.toHaveURL(/\/books\/[^/]+$/);
    await snap(page, testInfo, 'empty name rejected');
  });

  test('AUT-B04 name of 255 characters is accepted', async ({ page }, testInfo) => {
    await allure.severity('normal');
    const book = new BookPage(page);
    await book.openCreateForm();
    await book.create('a'.repeat(255));
    await expect(page).toHaveURL(/\/books\//);
    await snap(page, testInfo, '255 chars accepted');
    await book.deleteCurrentBook();
  });

  test('AUT-B05 name of 256 characters is rejected', async ({ page }, testInfo) => {
    await allure.severity('normal');
    const book = new BookPage(page);
    await book.openCreateForm();
    await book.create('a'.repeat(256));
    await expect(page.locator('.text-neg').first()).toBeVisible();
    await snap(page, testInfo, '256 chars rejected');
  });

  test('AUT-B06 script text in name is rendered as plain text', async ({ page }, testInfo) => {
    await allure.severity('critical');
    let dialogSeen = false;
    page.on('dialog', async (d) => { dialogSeen = true; await d.dismiss(); });
    const book = new BookPage(page);
    const name = `<script>alert(1)</script> ${Date.now()}`;
    await book.openCreateForm();
    await book.create(name);
    await expect(page).toHaveURL(/\/books\//);
    expect(dialogSeen).toBe(false);
    await snap(page, testInfo, 'xss text escaped');
    await book.deleteCurrentBook();
  });
});
