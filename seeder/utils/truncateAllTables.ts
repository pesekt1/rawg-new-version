import { DataSource } from "typeorm";

export async function truncateAllTables(dataSource: DataSource) {
  // Disable foreign key checks
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 0");

  // Get all table names in the current database
  const dbName = (await dataSource.query("SELECT DATABASE() AS db"))[0].db;
  const tables: { table_name: string }[] = await dataSource.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
    [dbName]
  );

  // Truncate each table
  for (const { table_name } of tables) {
    await dataSource.query(`TRUNCATE TABLE \`${table_name}\``);
  }

  // Re-enable foreign key checks
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
}
