import { DataSource } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";

export async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  // Create the stored procedure for setting admin hashed password manually
  await dataSource.query(`
    DROP PROCEDURE IF EXISTS set_admin_password;
  `);
  await dataSource.query(`
    CREATE PROCEDURE set_admin_password(IN new_hash VARCHAR(100))
    BEGIN
      UPDATE user
      SET passwordHash = new_hash
      WHERE username = 'admin';
    END
  `);

  async function seedSingleUser(
    username: string,
    password: string,
    role: "admin" | "user"
  ) {
    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await userRepo.findOneBy({ username });
    if (existing) {
      existing.passwordHash = passwordHash;
      existing.role = role;
      await userRepo.save(existing);
      console.log(`Updated ${role}: ${username}`);
    } else {
      const user = userRepo.create({ username, passwordHash, role });
      await userRepo.save(user);
      console.log(`Seeded ${role}: ${username}`);
    }
  }

  await seedSingleUser("user", "user", "user"); //just for testing, remove in production
  await seedSingleUser("admin", "admin", "admin"); //just for testing, remove in production
}
