import { Page, expect } from '@playwright/test';

export class BookPage {
  constructor(private page: Page) {}

  nameInput = () => this.page.locator('input[name="name"]');
  saveButton = () => this.page.getByRole('button', { name: 'Save Book' });

  async openCreateForm() {
    await this.page.goto('/create-book');
    await expect(this.nameInput()).toBeVisible();
  }

  async create(name: string) {
    await this.nameInput().fill(name);
    await this.saveButton().click();
  }

  /** Cleanup helper so the shared demo is not filled with test data. */
  async deleteCurrentBook() {
    await this.page.goto(this.page.url().replace(/\/?$/, '') + '/delete');
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }
}
