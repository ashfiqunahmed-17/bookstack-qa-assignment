# BookStack Demo – Playwright + Allure Automation

UI test automation for https://demo.bookstackapp.com using **Playwright (TypeScript)** with **Allure** reporting and screenshots.

## Scenarios automated
1. **Login** – valid, wrong password, unknown email, empty form (`tests/login.spec.ts`)
2. **Create Book** – valid, empty, 255/256 characters, script text (`tests/book.spec.ts`)
3. **Search** – new book found, no results, special characters (`tests/search.spec.ts`)

## Prerequisites
- Node.js 18+
- Java 8+ (needed by the Allure command line)

## Setup
```bash
npm install
npx playwright install chromium
```

## Run tests
```bash
npm test
```

## Generate and open the Allure report
```bash
npm run report
```
Each test has screenshots attached (an automatic end-of-test screenshot plus named step screenshots). Open a test in the report and look under **Attachments**.

## Structure
```
pages/    page objects
tests/    spec files + auth.setup.ts (logs in once, reuses session)
utils/    config + screenshot helper
```

## Demo credentials
`admin@example.com` / `password` (public demo account from the assignment)
