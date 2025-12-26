import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Developer } from "../entities/Developer";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Publisher } from "../entities/Publisher";
import { Review } from "../entities/Review";
import { Screenshot } from "../entities/Screenshot";
import { Store } from "../entities/Store";
import { Tag } from "../entities/Tag";
import { Trailer } from "../entities/Trailer";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production", // Set to false in production and use migrations instead
  logging: true,
  entities: [
    Game,
    Genre,
    Store,
    ParentPlatform,
    Publisher,
    Trailer,
    Screenshot,
    User,
    Developer,
    Tag,
    Review,
  ],
  migrations: [],
  subscribers: [],
});
