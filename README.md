# BookStack Demo – QA Assignment

## Project Overview
Quality assurance work on the **BookStack Demo** application (open-source documentation/wiki platform).

| Item | Detail |
|---|---|
| Application | BookStack Demo (https://demo.bookstackapp.com) |
| Feature under test | **Book management** (create, edit, validate, delete a Book) |
| Test types | Positive, Negative, Boundary Value, Edge Case |
| Tools | Browser DevTools, manual testing, Playwright (automation candidates) |
| Test environment | Chrome (latest), Windows/macOS, admin account |

## Why Book management?
Books are the core container in BookStack's hierarchy (Shelf → Book → Chapter → Page). Every other workflow depends on a Book being created correctly, so defects here have a high impact.

## Repository Contents
| File | Purpose |
|---|---|
| `README.md` | Overview and testing summary |
| `Test-Cases.md` | Functional test cases + execution results |
| `Bug-Report.md` | Reproducible bug report with evidence |
| `Automation.md` | Three automation candidates with justification |
| `automation/` | Playwright + Allure project implementing the three automation scenarios (Task 3) |
| `evidence/` | Screenshots referenced by the bug report |

**Task split:** Task 1 (functional testing) and Task 2 (bug hunting) were done **manually**. Only Task 3 is automated, using Playwright with Allure reporting and screenshots.

## Testing Summary
| Category | Total | Pass | Fail | Blocked |
|---|---|---|---|---|
| Positive | 6 | _fill_ | _fill_ | _fill_ |
| Negative | 7 | _fill_ | _fill_ | _fill_ |
| Boundary | 6 | _fill_ | _fill_ | _fill_ |
| Edge | 7 | _fill_ | _fill_ | _fill_ |
| **Total** | **26** | _fill_ | _fill_ | _fill_ |

Bugs found: _fill_ (see `Bug-Report.md`)

## Key Findings
- _Summarise after execution: what worked, what failed, overall quality impression._

## Notes
- Credentials used: the demo admin account supplied in the assignment.
- The demo instance resets periodically, so data created during testing may disappear.
