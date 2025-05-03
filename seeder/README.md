# RAWG Seeder

This project is a database seeder for the Game database, using TypeORM and data fetched from the RAWG API. It populates your MySQL database with games, genres, platforms, stores, publishers, trailers, screenshots, users, developers, and tags.

## Prerequisites

- Node.js (v16+ recommended)
- MySQL server with a database named `rawgDatabase`
- RAWG API key (register at [RAWG.io](https://rawg.io/apidocs))
- `.env` file with the following variables:
  ```
  DATABASE_URL=mysql://user:password@localhost:3306/rawgDatabase
  RAWG_API_KEY=your_rawg_api_key
  RAWG_API_URL=https://api.rawg.io/api/games
  GAME_PAGES=1
  ```

## Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Ensure your MySQL server is running and the `rawgDatabase` exists.

3. Create a `.env` file in this directory (see above).

## Usage

To seed the database, run:

```
npm start
```

This will:

- Truncate all tables
- Seed test users (`admin` and `user`)
- Fetch and seed games and related data from the RAWG API

To only seed users (for testing):

```
npm start user
```

## Notes

- The seeder is for development/testing. Do **not** use `synchronize: true` in production.
- The number of games seeded is controlled by the `GAME_PAGES` environment variable.
- Test users are seeded by default; remove them in production.
