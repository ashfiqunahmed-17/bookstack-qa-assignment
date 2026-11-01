# Bug Report – BookStack Demo

> **Important:** Only submit a bug you have actually reproduced yourself and captured evidence for. Pick the candidate below that fails for you (see Test-Cases.md: TC-N02, TC-B05, TC-E02, TC-E06), and replace the italic placeholders.

---

## BUG-001

| Field | Details |
|---|---|
| **Bug ID** | BUG-001 |
| **Bug Title** | _e.g. Book can be created with a whitespace-only name_ |
| **Module** | Books → Create Book |
| **Environment** | BookStack Demo, Chrome _version_, _OS_, admin account |
| **Severity** | _Low / Medium / High / Critical_ |
| **Priority** | _Low / Medium / High_ |
| **Status** | Open |
| **Reported on** | _date_ |

### Steps to Reproduce
1. Go to the BookStack Demo and log in with `admin@example.com` / `password`.
2. Click **Books → Create New Book**.
3. _Enter the problematic input, e.g. 5 spaces in the Name field._
4. Click **Save Book**.

### Expected Result
_Validation error is shown and no book is created._

### Actual Result
_Describe exactly what happened, e.g. a book with an empty/blank title was created and appears as a blank entry in the Books list._

### Evidence
- Screenshot: `evidence/bug-001-step3.png` (input)
- Screenshot: `evidence/bug-001-result.png` (result)

![result](evidence/bug-001-result.png)

---

## Candidate bug areas to probe (pick whichever really fails)

| Candidate | How to test | Typical severity |
|---|---|---|
| Whitespace-only name accepted | TC-N02 | Low–Medium |
| 256-character name accepted or causes server error (500) | TC-B05 | Medium |
| Name with HTML/script not escaped in some view (list, breadcrumb, search) | TC-E02 | High |
| Double-click on Save creates duplicate books | TC-E06 | Low–Medium |
| Very long name without spaces overflows layout on book card / sidebar | TC-B04 | Low |
| Emoji/Unicode name produces broken slug or 404 on book URL | TC-E03 | Medium |

## Severity Guide
- **Critical:** crash, data loss, security hole (e.g. working XSS)
- **High:** major feature broken, no workaround
- **Medium:** feature misbehaves, workaround exists
- **Low:** cosmetic or minor validation gap
