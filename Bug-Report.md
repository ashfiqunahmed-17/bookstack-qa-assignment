# Bug Report – BookStack Demo

## BUG-001

| Field | Details |
|---|---|
| **Bug ID** | BUG-001 |
| **Bug Title** | Multiple books are created when the "Save Book" button is clicked more than once |
| **Module** | Books → Create New Book |
| **Related test case** | TC-E06 (Double-click Save) |
| **Environment** | BookStack Demo (https://demo.bookstackapp.com); Google Chrome 156.0.8078.79 (64-bit); Windows; logged in as admin@example.com |
| **Severity** | Medium |
| **Priority** | Medium |
| **Status** | Open |
| **Reported on** | 01.11.2026 |
| **Reported by** | Ashfiqun Ahmed Miftah |

### Description
When the **Save Book** button is clicked more than once in quick succession on the Create Book form (for example a double-click, or clicking again because the page responds slowly), the application creates several books with the same name instead of one. The button is not disabled and duplicate submissions are not prevented.

### Steps to Reproduce
1. Open https://demo.bookstackapp.com and log in with `admin@example.com` / `password`.
2. Go to **Books → Create New Book**.
3. Enter `abc` in the **Name** field.
4. Double-click (or click several times quickly) on the **Save Book** button.
5. Go to **Books** and check the list.

### Expected Result
Only one book named `abc` is created. The Save button should be disabled after the first click, or duplicate submissions should be ignored.

### Actual Result
More than one book named `abc` was created. Each one has its own URL.

### Impact
- Duplicate content that users have to delete by hand.
- Extra clutter in the Books list and in search results.
- Likely to happen to real users on slow connections or with accidental double-clicks.

### Workaround
Delete the extra books manually.

### Evidence
- Recording/screenshot: https://drive.google.com/file/d/1nKjiyxziyxZ4V_emMoOPjeYSRQnZ8wls/view?usp=sharing
- Also attached to the Jira ticket.

### Severity Rationale
Medium: the feature works but produces incorrect data. It is not a crash or data loss, and the extra books can be removed.
