# BetterSentry+ Sample App

A small Node.js/TypeScript app with **planted bugs** for the BetterSentry+ demo.
The Repair Agent opens real GitHub PRs against this repo to fix these bugs.

## Repo Structure

```
sample-repo/
├── src/
│   ├── index.ts          # Express server entry point
│   ├── api/
│   │   └── users.ts      # BUG 1: Null reference in getUser()
│   ├── services/
│   │   ├── checkout.ts   # BUG 2: Missing import for processPayment()
│   │   └── payment.ts    # processPayment() lives here (not imported)
│   └── lib/
│       └── config.ts     # BUG 3: JSON.parse(undefined) in parseConfig()
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## Planted Bugs

### Bug 1: Null Reference in `getUser()`

**File:** `src/api/users.ts`
**Error:** `TypeError: Cannot read properties of undefined (reading 'name')`
**Culprit:** `src/api/users.ts in getUser`
**Root Cause:** `users.find()` returns `undefined` when user ID doesn't exist. The code immediately accesses `.name` without a null check.
**Fix:** Add `if (!user) throw new Error("User not found")` (or return 404) before accessing `user.name`.

### Bug 2: Missing Import in `handleCheckout()`

**File:** `src/services/checkout.ts`
**Error:** `ReferenceError: processPayment is not defined`
**Culprit:** `src/services/checkout.ts in handleCheckout`
**Root Cause:** `processPayment()` is called but never imported. The function exists in `./payment.ts`.
**Fix:** Add `import { processPayment } from "./payment";` at the top of checkout.ts.

### Bug 3: JSON Parse of Undefined in `parseConfig()`

**File:** `src/lib/config.ts`
**Error:** `SyntaxError: Unexpected token u in JSON at position 0`
**Culprit:** `src/lib/config.ts in parseConfig`
**Root Cause:** When `config.json` doesn't exist, the catch block logs a warning but falls through to `JSON.parse(data)` where `data` is `undefined`.
**Fix:** Return `DEFAULT_CONFIG` inside the catch block, or move `JSON.parse()` inside the try block.

## Demo Scenarios

Each bug corresponds to a Sentry incident that triggers the BetterSentry+ pipeline:

| Scenario | Trigger | Expected Repair Agent Output |
|----------|---------|------------------------------|
| 1 | `GET /api/users/999` | Adds null check, returns 404 for missing users |
| 2 | `POST /api/checkout` | Adds missing import statement |
| 3 | App startup (no config.json) | Returns default config in catch block |

## For Person C (Repair Agent)

When generating fixes, the agent should:
- Create a branch named `fix/{incident-id}-{short-description}`
- Make minimal, focused changes (5-15 lines max)
- Include the root cause in the PR body
- Reference the file path and line number
