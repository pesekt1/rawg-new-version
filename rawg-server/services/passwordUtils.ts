import bcrypt from "bcryptjs";

/**
 * Hash a plain password.
 * @param password Plain password string.
 * @returns Promise resolving to the hashed password.
 */
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare a plain password with a hash.
 * @param password Plain password string.
 * @param hash Hashed password.
 * @returns Promise resolving to a boolean indicating match.
 */
export function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
