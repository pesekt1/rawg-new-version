import { AppDataSource } from "./data-source";

/**
 * Initializes the MySQL database connection using TypeORM.
 * Exits the process if the connection fails.
 */
const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Error connecting to MySQL database", error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default dbConnectMysql;
