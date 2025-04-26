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

  // Filter out any undefined or falsy table names
  const validTables = tables.map((t) => t.table_name).filter((name) => !!name);

  // Truncate each valid table
  for (const tableName of validTables) {
    await dataSource.query(`TRUNCATE TABLE \`${tableName}\``);
  }

  // Re-enable foreign key checks
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 1");
}
