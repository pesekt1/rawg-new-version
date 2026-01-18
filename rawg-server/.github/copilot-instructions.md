# Copilot instructions — rawg-server (Node/Express + TypeScript + tsoa)

## Goals

- Follow existing controller/service/repository patterns.
- Keep API behavior consistent and predictable.

## Architecture rules

- Controllers: thin; validate/parse inputs and delegate to services.
- Services: business logic; no HTTP concerns.
- Repositories: persistence only; no business logic.

## Error handling

- Prefer the project’s existing error utilities/middleware patterns.
- Don’t swallow errors; return/throw in the same style as nearby services/controllers.

## TypeScript style

- Avoid `any`; prefer explicit DTOs/types.
- Keep naming consistent with existing DTO/entity naming.

## Output constraints

- Minimal changes; avoid refactors unless requested.
- Keep endpoint shapes/backward compatibility unless explicitly asked.
