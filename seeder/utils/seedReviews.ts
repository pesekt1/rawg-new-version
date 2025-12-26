import { DataSource } from "typeorm";
import { Game } from "../entities/Game";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import {
  generateLongReview,
  personaForUser,
  ratingFor,
} from "./reviewGenerator";

function envInt(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

function envBool(name: string, fallback: boolean) {
  const raw = process.env[name];
  if (!raw) return fallback;
  return ["1", "true", "yes", "y", "on"].includes(raw.toLowerCase());
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export async function seedReviews(dataSource: DataSource) {
  // Tuned defaults for ~600 games:
  // - allGames=false: generate a demo-friendly subset per user (fast, smaller DB)
  // - allGames=true: each user reviews every game (heavy but doable)
  const allGames = envBool("REVIEWS_ALL_GAMES", false);
  const minPerUser = envInt("REVIEWS_PER_USER_MIN", 18);
  const maxPerUser = envInt("REVIEWS_PER_USER_MAX", 35);
  const chunkSize = envInt("REVIEWS_INSERT_CHUNK", 500);

  const userRepo = dataSource.getRepository(User);
  const gameRepo = dataSource.getRepository(Game);
  const reviewRepo = dataSource.getRepository(Review);

  const users = await userRepo.find({ select: ["id", "username"] });
  const games = await gameRepo.find({ select: ["id", "name"] });

  if (users.length === 0 || games.length === 0) {
    console.log("Skipping review seeding (no users or games).");
    return;
  }

  const pending: Review[] = [];

  for (const user of users) {
    const persona = personaForUser(user.username);
    const rngUser = mulberry32(user.id * 1000003);

    const chosenGames = allGames
      ? games
      : (() => {
          const desired = Math.min(
            games.length,
            minPerUser +
              Math.floor(rngUser() * Math.max(1, maxPerUser - minPerUser + 1))
          );

          // Sample without replacement by shuffling a copy (fast enough for 600 games)
          const pool = games.slice();
          for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(rngUser() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
          }
          return pool.slice(0, desired);
        })();

    for (const game of chosenGames) {
      const rng = mulberry32(user.id * 7919 + game.id * 104729);
      const rating = ratingFor(rng, persona);

      const reviewText = generateLongReview({
        gameName: game.name,
        rating,
        persona,
        userId: user.id,
        gameId: game.id,
      });

      // Important: Your Review PK is (userId, gameId) so this is naturally unique.
      // If you re-run without truncating, save() will update existing rows with same PK.
      pending.push(
        reviewRepo.create({
          userId: user.id,
          gameId: game.id,
          rating,
          review: reviewText,
        })
      );

      if (pending.length >= chunkSize) {
        await reviewRepo.save(pending);
        pending.length = 0;
      }
    }
  }

  if (pending.length > 0) {
    await reviewRepo.save(pending);
  }

  console.log(
    `Seeding reviews completed. users=${users.length} games=${games.length} allGames=${allGames}`
  );
}
