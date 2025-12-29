export interface UserReadDto {
  id: number;
  username: string;
  role: "admin" | "user";
  email?: string;
  avatarUrl?: string;
}
