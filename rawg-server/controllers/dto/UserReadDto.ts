export interface UserReadDto {
  id: number;
  username: string;
  role: "admin" | "user";
}
