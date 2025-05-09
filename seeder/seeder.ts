import { AppDataSource } from "./data-source";
import { truncateAllTables } from "./utils/truncateAllTables";
import { seedUser } from "./utils/seedUser";
import { seedGames } from "./utils/seedGames";

//await cannot be used at the top level in a module, so we wrap it in an async IIFE
(async () => {
  await AppDataSource.initialize(); //initialize connection

  const mode = process.argv[2];

  if (mode === "user") {
    await seedUser(AppDataSource);
    console.log("User seeding completed successfully.");
    process.exit();
  }

  await truncateAllTables(AppDataSource);
  await seedUser(AppDataSource);
  await seedGames(AppDataSource);

  console.log("Seeding completed successfully.");
  //terminate the process
  process.exit();
})();
