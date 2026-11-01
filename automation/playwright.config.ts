import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: 0,
  workers: 1, // shared demo instance: run sequentially
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true }],
  ],
  use: {
    baseURL: 'https://demo.bookstackapp.com',
    headless: true,
    screenshot: 'on',              // screenshot attached to Allure for EVERY test
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts/,
    },
  ],
});
