# Copilot instructions — rawg-client (Vite + React + TypeScript)

## Goals

- Match existing React/TS patterns in this package.
- Prefer small components, clear props, and predictable state.

## Style

- Use TypeScript strictly; avoid `any`.
- Prefer named exports unless the folder convention uses default.
- Prefer `const` and immutable updates.
- Use early returns; avoid deep nesting.

## React patterns

- Prefer function components + hooks.
- Keep components presentational; move data fetching to hooks/services already used in this package.
- Do not introduce new state libraries unless the repo already uses them here.

## Imports/structure

- Follow the existing folder conventions in `src/`.
- Do not create new “utils” if a similar helper exists already.

## Output constraints

- Minimize diffs: don’t reformat unrelated code.
- If unsure about a pattern, copy the closest existing file’s approach.
