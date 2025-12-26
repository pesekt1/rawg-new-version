import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
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
    } else {
      const user = userRepo.create({ username, passwordHash, role });
      await userRepo.save(user);
    }
  }

  // Replace the old randomUsername with faker-based random names + 0..100
  const randomUsername = () => {
    const fullName = `${faker.person.firstName()}_${faker.person.lastName()}`;
    const n = faker.number.int({ min: 0, max: 100 });
    return `${fullName}_${n}`
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
  };

  async function seedHundredUsers() {
    for (let i = 0; i < 100; i++) {
      const username = randomUsername();
      await seedSingleUser(username, username, "user");
    }
  }

  await seedSingleUser("user", "user", "user"); //just for testing, remove in production
  await seedSingleUser("admin", "admin", "admin"); //just for testing, remove in production

  await seedHundredUsers();

  console.log("Seeding users completed.");
}
