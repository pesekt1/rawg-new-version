# Copilot instructions — monorepo

This repo contains multiple packages with different conventions.

- If editing under `rawg-client/`: follow the React/Vite patterns in that package.
- If editing under `rawg-server/`: follow controller/service/repository layering and tsoa patterns.
- If editing under `seeder/`: follow the code style in that package.

Always match the closest existing code in the same package.
Minimize diffs; don’t refactor unrelated code.
