# Test Automation Candidates – BookStack Demo

Tool: **Playwright** (TypeScript) with **Allure** reporting. Base URL: `https://demo.bookstackapp.com`

## Implementation
The three scenarios below are implemented in the [`automation/`](automation/) folder:

| Scenario | Spec file |
|---|---|
| 1. Login | `automation/tests/login.spec.ts` |
| 2. Create Book | `automation/tests/book.spec.ts` |
| 3. Search | `automation/tests/search.spec.ts` |

Run them:
```bash
cd automation
npm install
npx playwright install chromium
npm test
npm run report     # generates and opens the Allure report
```
Every test attaches screenshots to the Allure report (an automatic end-of-test screenshot plus named step screenshots). Screenshots of the generated report are in `automation/screenshots/`.

---

## Candidate 1: Login (valid and invalid credentials)

**Why automate:** Login gates every feature, runs on every build as a smoke test, is stable, and uses data-driven inputs (many credential combinations) that are tedious to run manually.

| ID | Step | Test Data | Expected |
|---|---|---|---|
| AUT-L01 | Open `/login` | – | Login form visible |
| AUT-L02 | Enter valid email and password, click Log In | `admin@example.com` / `password` | Redirected to home page; user menu visible |
| AUT-L03 | Enter valid email, wrong password | `admin@example.com` / `wrong` | Error message; stays on login |
| AUT-L04 | Enter unregistered email | `nobody@example.com` / `password` | Error message; stays on login |
| AUT-L05 | Clear the pre-filled email and password fields, then click Log In with the empty form | empty email / empty password | Form is not submitted; user stays on `/login` |

```js
import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button:has-text("Log In")');
  await expect(page).not.toHaveURL(/login/);
});

test('login with wrong password', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'wrong');
  await page.click('button:has-text("Log In")');
  await expect(page).toHaveURL(/login/);
});
```

**Note:** the demo site pre-fills the login form with the demo credentials. AUT-L05 therefore clears both fields first; otherwise the click would log the user in and the test would fail for the wrong reason (found during the first test run).

```js
test('AUT-L05 empty form is not submitted', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', '');
  await page.fill('input[name="password"]', '');
  await page.click('button:has-text("Log In")');
  await expect(page).toHaveURL(/\/login/);
});
```

---

## Candidate 2: Create Book with validation (data-driven)

**Why automate:** Core workflow with many repetitive input variations (empty, boundary lengths, special characters). A data-driven test covers dozens of cases in seconds and guards against regressions in validation.

| ID | Step | Test Data | Expected |
|---|---|---|---|
| AUT-B01 | Log in, open `/create-book` | – | Form visible |
| AUT-B02 | Enter valid name, save | `Auto Book <timestamp>` | Book page opens with the name |
| AUT-B03 | Empty name, save | `""` | Validation error; no book |
| AUT-B04 | 255-char name, save | 255 × `a` | Book created |
| AUT-B05 | 256-char name, save | 256 × `a` | Validation error |
| AUT-B06 | Special characters / script text | `<script>x</script>` | Rendered as text, no alert dialog |

```js
const cases = [
  { name: 'a'.repeat(255), ok: true },
  { name: 'a'.repeat(256), ok: false },
  { name: '', ok: false },
];

for (const c of cases) {
  test(`create book length=${c.name.length}`, async ({ page }) => {
    await page.goto('/create-book');
    await page.fill('input[name="name"]', c.name);
    await page.click('button:has-text("Save Book")');
    if (c.ok) await expect(page).toHaveURL(/\/books\//);
    else await expect(page.locator('.text-neg')).toBeVisible();
  });
}
```
_(Reuse a logged-in storage state via `storageState` so each test starts authenticated.)_

---

## Candidate 3: Search for content

**Why automate:** Search is used constantly, depends on data created by other tests, and breaks easily after indexing or UI changes. Automated checks (create content, search, assert) give fast regression feedback.

| ID | Step | Test Data | Expected |
|---|---|---|---|
| AUT-S01 | Create a book with a unique name | `UniqueBook<timestamp>` | Book exists |
| AUT-S02 | Search that exact name in the search bar | same | Result list contains the book |
| AUT-S03 | Search a non-existent term | `zzzxxyy123` | "No results" message |
| AUT-S04 | Search with special characters | `<>"'` | No error page; safe empty/escaped result |

```js
test('search finds a newly created book', async ({ page }) => {
  const name = `UniqueBook${Date.now()}`;
  await page.goto('/create-book');
  await page.fill('input[name="name"]', name);
  await page.click('button:has-text("Save Book")');
  await page.goto(`/search?term=${encodeURIComponent(name)}`);
  await expect(page.getByText(name).first()).toBeVisible();
});
```

---

## Notes on Test IDs and Code
- Steps such as AUT-L01, AUT-B01 and AUT-S01 (open a page, prepare data) are setup steps and are performed inside the tests. A one-time admin login (`tests/auth.setup.ts`) is reused by the book and search tests.
- The snippets in this document are shortened. The full, runnable code is in `automation/tests/`.

## Execution Results (Allure Report)
| Spec file | Tests | Result |
|---|---|---|
| `login.spec.ts` | 4 | Passed |
| `book.spec.ts` | 5 | Passed |
| `search.spec.ts` | 3 | Passed |
| `auth.setup.ts` (login once) | 1 | Passed |
| **Total** | **13** | **All passed** |

Allure report screenshots (every test also has a screenshot attached):

**Overview**
![Allure overview](automation/screenshots/allure-overview.png)

**Test suites**
![Allure suites](automation/screenshots/allure-suites.png)

**Test with screenshot attachment**
![Allure test attachment](automation/screenshots/allure-test-attachment.png)

---

## Summary
| # | Scenario | Type | Main benefit |
|---|---|---|---|
| 1 | Login | Smoke / regression | Fast gate check each build |
| 2 | Create Book (data-driven) | Functional / boundary | Many inputs, low effort |
| 3 | Search | Regression / integration | Verifies cross-feature behaviour |
