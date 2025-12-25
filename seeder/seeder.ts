import { config } from "dotenv"; // Import dotenv
config(); // Load environment variables

import { AppDataSource } from "./data-source";
import { seedGames } from "./utils/seedGames";
import { seedUser } from "./utils/seedUser";
import { truncateAllTables } from "./utils/truncateAllTables";

//await cannot be used at the top level in a module, so we wrap it in an async IIFE
(async () => {
  await AppDataSource.initialize(); //initialize connection

  const mode = process.argv[2]; // Get mode from command line arguments
  const gamePages = parseInt(process.env.GAME_PAGES || "1", 10); // Default to 1 if not set

  // If mode is "user", only seed users
  if (mode === "user") {
    await seedUser(AppDataSource);
    console.log("User seeding completed successfully.");
    process.exit();
  }

  await truncateAllTables(AppDataSource);
  await seedUser(AppDataSource);
  await seedGames(AppDataSource, gamePages); // Pass gamePages to seedGames

  console.log("Seeding completed successfully.");
  //terminate the process
  process.exit();
})();
