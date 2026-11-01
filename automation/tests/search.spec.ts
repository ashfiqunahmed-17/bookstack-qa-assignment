import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BookPage } from '../pages/BookPage';
import { uniqueName } from '../utils/config';
import { snap } from '../utils/screenshot';

test.describe('Search', () => {
  test.beforeEach(async () => {
    await allure.epic('BookStack Demo');
    await allure.feature('Search');
  });

  test('AUT-S02 search finds a newly created book', async ({ page }, testInfo) => {
    await allure.severity('critical');
    const book = new BookPage(page);
    const name = uniqueName('UniqueBook');
    await book.openCreateForm();
    await book.create(name);
    await expect(page).toHaveURL(/\/books\//);
    const bookUrl = page.url();

    await page.goto(`/search?term=${encodeURIComponent(name)}`);
    await expect(page.getByText(name).first()).toBeVisible();
    await snap(page, testInfo, 'search result');

    await page.goto(bookUrl);
    await book.deleteCurrentBook();
  });

  test('AUT-S03 search for a non-existent term shows no results', async ({ page }, testInfo) => {
    await allure.severity('normal');
    await page.goto('/search?term=zzzxxyy123nothing');
    await expect(page.getByText(/no .*results|no items/i).first()).toBeVisible();
    await snap(page, testInfo, 'no results');
  });

  test('AUT-S04 special characters do not break search', async ({ page }, testInfo) => {
    await allure.severity('minor');
    const res = await page.goto(`/search?term=${encodeURIComponent('<>"\'')}`);
    expect(res?.status()).toBeLessThan(500);
    await snap(page, testInfo, 'special chars');
  });
});
