import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  email = () => this.page.locator('input[name="email"]');
  password = () => this.page.locator('input[name="password"]');
  submit = () => this.page.getByRole('button', { name: 'Log In' });

  async open() {
    await this.page.goto('/login');
    await expect(this.email()).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.email().fill(email);
    await this.password().fill(password);
    await this.submit().click();
  }
}
