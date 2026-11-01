import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage';
import { ADMIN } from '../utils/config';
import { snap } from '../utils/screenshot';

// Login tests must start logged out
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async () => {
    await allure.epic('BookStack Demo');
    await allure.feature('Authentication');
  });

  test('AUT-L02 valid credentials log the user in', async ({ page }, testInfo) => {
    await allure.severity('blocker');
    const login = new LoginPage(page);
    await login.open();
    await snap(page, testInfo, '1 - login page');
    await login.login(ADMIN.email, ADMIN.password);
    await expect(page).not.toHaveURL(/\/login/);
    await snap(page, testInfo, '2 - after login');
  });

  test('AUT-L03 wrong password is rejected', async ({ page }, testInfo) => {
    await allure.severity('critical');
    const login = new LoginPage(page);
    await login.open();
    await login.login(ADMIN.email, 'wrong-password');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('.text-neg').first()).toBeVisible();
    await snap(page, testInfo, 'error shown');
  });

  test('AUT-L04 unregistered email is rejected', async ({ page }, testInfo) => {
    await allure.severity('critical');
    const login = new LoginPage(page);
    await login.open();
    await login.login('nobody@example.com', 'password');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('.text-neg').first()).toBeVisible();
    await snap(page, testInfo, 'error shown');
  });

  test('AUT-L05 empty form is not submitted', async ({ page }, testInfo) => {
  await allure.severity('normal');
  const login = new LoginPage(page);
  await login.open();
  await login.email().fill('');
  await login.password().fill('');
  await login.submit().click();
  await expect(page).toHaveURL(/\/login/);
  await snap(page, testInfo, 'empty submit');
});
});
