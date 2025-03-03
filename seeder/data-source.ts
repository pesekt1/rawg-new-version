import "reflect-metadata";
import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { Store } from "./entities/Store";
import { ParentPlatform } from "./entities/ParentPlatform";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root", // Change to your MySQL username
  password: "123456", // Change to your MySQL password
  database: "rawgDatabase",
  synchronize: true, // Set to false in production and use migrations instead
  logging: false,
  entities: [Game, Genre, Store, ParentPlatform],
  migrations: [],
  subscribers: [],
});
