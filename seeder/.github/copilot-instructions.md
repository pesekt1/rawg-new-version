# Copilot instructions — seeder (TypeScript data seeding)

## Goals

- Deterministic, repeatable seeding.
- Clear logs, safe retries, and idempotent behavior where possible.

## Style

- Prefer simple scripts with clear steps.
- Avoid clever abstractions; keep it readable.
- Use existing DB/data-source utilities in this package.

## Safety

- Do not add destructive behavior by default.
- If an operation can wipe data, require an explicit flag/env var.

## Output constraints

- Keep changes localized to seeder package.
- Minimize diffs and match existing patterns.
