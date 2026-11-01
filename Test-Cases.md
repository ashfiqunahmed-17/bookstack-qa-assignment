# Functional Test Cases – Book Management (BookStack Demo)

**Feature:** Create / edit / delete a Book
**Precondition (all):** Logged in as `admin@example.com`; navigate to **Books → Create New Book** (`/create-book`).
**Status key:** Pass / Fail / Blocked. Fill **Actual Result** and **Status** while executing.

> Expected results reflect BookStack's standard behaviour (Name is required, max 255 characters, descriptions are optional). Verify limits on the demo version as you test.

## A. Positive Tests

| ID | Title | Steps | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-P01 | Create book with name only | Open Create Book → enter name → Save Book | Name: `QA Test Book 01` | Book is created, user lands on the book page, name shown | | |
| TC-P02 | Create book with name and description | Enter name and description → Save | `QA Book 02` / `Book for testing` | Book created; description visible on book page | | |
| TC-P03 | Create book with tag | Add tag name/value → Save | Tag: `env` = `test` | Book saved; tag shown in sidebar | | |
| TC-P04 | Edit book name | Open book → Edit → change name → Save | `QA Book 04 Edited` | Updated name shown in breadcrumb and list | | |
| TC-P05 | Book appears in Books list | Create book → go to Books | – | New book listed | | |
| TC-P06 | Delete a book | Open book → Delete → confirm | – | Book removed; success notice; absent from list | | |

## B. Negative Tests

| ID | Title | Steps | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-N01 | Empty name | Leave name blank → Save | `""` | Validation error ("name field is required"); no book created | | |
| TC-N02 | Whitespace-only name | Enter spaces → Save | `"     "` | Rejected with validation error | | |
| TC-N03 | Name exceeds max length | Enter 256+ chars → Save | 256 × `a` | Validation error about maximum length; no book created | | |
| TC-N04 | Cancel creation | Fill name → Cancel | `Cancelled Book` | No book is created | | |
| TC-N05 | Delete confirmation declined | Delete → Cancel on dialog | – | Book remains | | |
| TC-N06 | Create book while logged out | Log out → open `/create-book` | – | Redirected to login / access denied | | |
| TC-N07 | Tag with empty name but value | Add tag value only → Save | value `x` | Tag ignored or validation error; no crash | | |

## C. Boundary Value Tests (Name length, limit assumed 255)

| ID | Title | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-B01 | Minimum length (1 char) | `A` | Book created | | |
| TC-B02 | Length 2 | `AB` | Book created | | |
| TC-B03 | Length 254 | 254 × `a` | Book created | | |
| TC-B04 | Length 255 (max) | 255 × `a` | Book created; name displayed/truncated gracefully, layout not broken | | |
| TC-B05 | Length 256 (max+1) | 256 × `a` | Validation error | | |
| TC-B06 | Description at upper limit / limit+1 | Max-length and +1 character description | At limit saves; above limit shows validation error | | |

## D. Edge Case Tests

| ID | Title | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-E01 | Special characters | `!@#$%^&*()_+-=[]{}` | Saved and displayed correctly; URL slug valid | | |
| TC-E02 | HTML/script injection (XSS) | `<script>alert(1)</script>` | Escaped; no script executes anywhere (list, breadcrumb, search) | | |
| TC-E03 | Unicode / emoji | `Книга 📚 书` | Saved and rendered correctly | | |
| TC-E04 | Duplicate name | Create two books `Duplicate Book` | Both accepted; distinct URL slugs (e.g. `duplicate-book-2`) | | |
| TC-E05 | Leading/trailing spaces | `  Trim Me  ` | Trimmed or handled consistently | | |
| TC-E06 | Double-click Save quickly | `Double Click Book` | Only one book created | | |
| TC-E07 | Name with only symbols | `????` | Handled; valid slug generated, book reachable | | |

## Execution Summary
| Executed on | Tester | Browser | Pass | Fail | Blocked |
|---|---|---|---|---|---|
| _date_ | _name_ | Chrome _version_ | | | |
