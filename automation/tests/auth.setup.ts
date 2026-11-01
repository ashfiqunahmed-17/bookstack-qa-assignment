import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ADMIN } from '../utils/config';

setup('authenticate as admin', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(ADMIN.email, ADMIN.password);
  await expect(page).not.toHaveURL(/\/login/);
  await page.context().storageState({ path: '.auth/user.json' });
});
