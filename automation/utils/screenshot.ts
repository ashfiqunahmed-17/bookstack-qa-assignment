import { Page, TestInfo } from '@playwright/test';

/** Takes a named screenshot and attaches it to the Allure report. */
export async function snap(page: Page, testInfo: TestInfo, name: string) {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
}
