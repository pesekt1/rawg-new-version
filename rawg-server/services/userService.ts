import { User } from "../entities/User";
import { UserReadDto } from "../controllers/dto/UserReadDto";
import { BaseDtoService } from "./baseDtoService";
import { toUserDto } from "../controllers/dto/entityMappers";

/**
 * Maps a User entity to UserDto.
 */

export const userService = new BaseDtoService<User, UserReadDto>(
  User,
  toUserDto
);
