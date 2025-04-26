import { DataSource } from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";

export async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  // Seed regular user
  const existingUser = await userRepo.findOneBy({ username: "user" });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash("user", 10);
    const user = userRepo.create({
      username: "user",
      passwordHash,
      role: "user",
    });
    await userRepo.save(user);
    console.log("Seeded user: user / user");
  } else {
    console.log("User already exists");
  }

  // Seed admin user
  const existingAdmin = await userRepo.findOneBy({ username: "admin" });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin", 10);
    const admin = userRepo.create({
      username: "admin",
      passwordHash,
      role: "admin",
    });
    await userRepo.save(admin);
    console.log("Seeded admin: admin / admin");
  } else {
    console.log("Admin already exists");
  }
}
