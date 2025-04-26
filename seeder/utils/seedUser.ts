import { DataSource } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";

export async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  async function seedSingleUser(username: string, role: "admin" | "user") {
    const existing = await userRepo.findOneBy({ username });
    if (!existing) {
      const passwordHash = await bcrypt.hash(username, 10);
      const user = userRepo.create({ username, passwordHash, role });
      await userRepo.save(user);
      console.log(`Seeded ${role}: ${username} / ${username}`);
    } else {
      console.log(
        `${role.charAt(0).toUpperCase() + role.slice(1)} already exists`
      );
    }
  }

  await seedSingleUser("user", "user");
  await seedSingleUser("admin", "admin");
}
