# Game Database Project Monorepo

This monorepo contains a demo application stack using Docker Compose, including:

- **mysql**: MySQL database for persistent storage.
- **seeder**: Seeds the database with game and user data from the RAWG API.
- **rawg-server**: Backend API server.
- **rawg-client**: Frontend client application.

## Getting Started

1. **Clone the repository** and navigate to this directory.

2. **Start the stack** (without seeder):

   ```
   make up
   ```

3. **Start the stack with seeder** (to seed games data):

   ```
   make up-seeder
   ```

   Or to specify number of game pages:

   ```
   make up-seeder-pages GAME_PAGES=2
   ```

4. **Stop all services**:

   ```
   make down
   ```

5. **Open documentation and client**:
   ```
   make open-tabs
   ```

## Environment Variables

- See `.env` files in each service for configuration.

## Project Structure

- `rawg-client/` – Frontend app
- `rawg-server/` – Backend API
- `seeder/` – Seeder scripts
- `docker-compose.yaml` – Service definitions
- `Makefile` – Helper commands

## GitHub Actions

This repository uses GitHub Actions for CI/CD:

- **rawg-server**:

  - `.github/workflows/server-ci.yml`: Runs tests on push/pull request to `rawg-server/`.
  - `.github/workflows/ci-cd_rawg-server.yml`: Builds and deploys the backend to Azure on push to `main`.

- **rawg-client**:
  - `.github/workflows/client-ci.yml`: Runs tests on push/pull request to `rawg-client/`.
  - `.github/workflows/ci-cd_rawg-client.yml`: Builds and deploys the frontend to Azure Static Web Apps on push/pull request to `main`.

---
