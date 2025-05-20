export interface UserUpdateDto {
  username?: string;
  role?: "admin" | "user";
  password?: string; // plain password, should be hashed before saving
}
