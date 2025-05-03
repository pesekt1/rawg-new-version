import { AppDataSource } from "../startup/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

/**
 * Service for handling authentication and user registration.
 */
export class AuthService {
  private static get userRepository() {
    return AppDataSource.getRepository(User);
  }

  /**
   * Register a new user.
   * @param username The username for the new user.
   * @param password The password for the new user.
   * @param role The role of the user ("admin" or "user"). Defaults to "user".
   * @returns An object containing the new user's id, username, and role.
   * @throws Error if the username already exists.
   */
  static async register(
    username: string,
    password: string,
    role: "admin" | "user" = "user"
  ) {
    const existing = await this.userRepository.findOneBy({ username });
    if (existing) throw new Error("Username already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, passwordHash, role });
    await this.userRepository.save(user);
    return { id: user.id, username: user.username, role: user.role };
  }

  /**
   * Authenticate a user and return a JWT token if successful.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An object containing the JWT token.
   * @throws Error if credentials are invalid.
   */
  static async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    return { token };
  }

  /**
   * Verify a JWT token.
   * @param token The JWT token to verify.
   * @returns The decoded token payload if valid, or null if invalid.
   */
  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }
}
