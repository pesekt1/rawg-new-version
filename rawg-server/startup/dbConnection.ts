import { AppDataSource } from "./data-source";

/**
 * Initializes the MySQL database connection using TypeORM.
 * Exits the process if the connection fails (except in test env).
 */
const dbConnectMysql = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Connected to MySQL database");
    }
  } catch (error) {
    console.error("Error connecting to MySQL database", error);
    if (process.env.NODE_ENV === "test") {
      throw error;
    } else {
      process.exit(1); // Exit the process if connection fails (not in test)
    }
  }
};

export default dbConnectMysql;
