# BookStack Demo – QA Assignment

## Project Overview
Quality assurance work on the **BookStack Demo** application, an open-source documentation and wiki platform.

| Item | Detail |
|---|---|
| Application | BookStack Demo – https://demo.bookstackapp.com |
| Login used | `admin@example.com` (demo account supplied in the assignment) |
| Feature tested | **Book management** (create, edit, delete a book) |
| Test types | Positive, Negative, Boundary Value, Edge Case |
| Tools | Manual testing, Excel, Jira, Playwright, Allure |
| Browser / OS | Google Chrome 156.0.8078.79 (64-bit) on Windows |
| Tester | Ashfiqun Ahmed Miftah |
| Date executed | 1 November 2026 |

**Why Book management?** Books are the core container in BookStack (Shelf → Book → Chapter → Page), so a defect when creating a book affects everything built on top of it.

## Task Overview
| Task | Approach | Where to look |
|---|---|---|
| 1. Functional Testing | Manual | `BookStack-Test-Cases-Completed.xlsx` → **Test Cases** and **Summary** sheets |
| 2. Bug Hunting | Manual | `BookStack-Test-Cases-Completed.xlsx` → **Bug Report** sheet, `Bug-Report.md`, `evidence/`, Jira |
| 3. Test Automation | Playwright + Allure | `Automation.md`, `automation/` |

## Repository Contents
| File / Folder | Purpose |
|---|---|
| `README.md` | Project overview and testing summary |
| `BookStack-Test-Cases-Completed.xlsx` | Functional test cases, execution results, summary and bug report (Tasks 1 and 2) |
| `Bug-Report.md` | Reproducible bug report with steps and evidence (Task 2) |
| `Automation.md` | Three automation scenarios, detailed test cases and justifications (Task 3) |
| `automation/` | Playwright + Allure project implementing the three scenarios |
| `automation/screenshots/` | Screenshots of the Allure report |
| `evidence/` | Screenshots for the bug report |

## Task 1 – Functional Testing Summary
25 test cases were executed manually on the Book management feature.

| Category | Total | Pass | Fail |
|---|---|---|---|
| Positive | 6 | 6 | 0 |
| Negative | 7 | 7 | 0 |
| Boundary | 6 | 6 | 0 |
| Edge | 6 | 4 | 2 |
| **Total** | **25** | **23** | **2** |

Overall pass rate: **92%**

**Failed test cases**
| ID | Title | Result |
|---|---|---|
| TC-E05 | Leading/trailing spaces in name | Spaces were not trimmed and were not handled consistently |
| TC-E06 | Double-click Save | Multiple books were created instead of one (**BUG-001**) |

**What worked well:** required-name validation, whitespace-only names rejected, the name length limit (255 accepted, 256 rejected), special characters, Unicode and emoji, duplicate names with separate URLs, and cancelling create/delete.

## Task 2 – Bug Found
**BUG-001 – Multiple books are created when the "Save Book" button is clicked more than once**

| Field | Detail |
|---|---|
| Related test case | TC-E06 |
| Severity / Priority | Medium / Medium |
| Steps | Books → Create New Book → enter a name → double-click **Save Book** → check the Books list |
| Expected | Only one book is created; the button should be disabled after the first click |
| Actual | More than one book with the same name was created, each with its own URL |
| Evidence | Video/screenshot: https://drive.google.com/file/d/1nKjiyxziyxZ4V_emMoOPjeYSRQnZ8wls/view?usp=sharing |

Full details are in `Bug-Report.md`, the **Bug Report** sheet of the Excel file, and the Jira ticket.

## Task 3 – Test Automation Summary
Three scenarios were chosen because they are stable, frequently repeated and easy to check:

| # | Scenario | Tests | Why automate |
|---|---|---|---|
| 1 | Login | 4 | Entry point for every feature; works as a smoke test on every build |
| 2 | Create Book (data-driven) | 5 | Many input variations and boundaries; quick to repeat |
| 3 | Search | 3 | Depends on data from other features; breaks easily |

Result: **13 tests (including the one-time login setup), all passed**. Every test attaches a screenshot to the Allure report. Report screenshots are in `automation/screenshots/` and are shown in `Automation.md`.

### How to run the automation
Requirements: Node.js 18+ and Java (for the Allure command line).
```bash
cd automation
npm install
npx playwright install chromium
npm test
npm run report      # builds and opens the Allure report
```

## Notes
- The demo login page pre-fills the demo credentials, so the empty-form login test clears both fields before submitting.
- The demo instance resets periodically, so books created during testing may disappear. The automated tests delete the books they create.
- Expected results assume BookStack's standard behaviour (name is required, maximum 255 characters).
