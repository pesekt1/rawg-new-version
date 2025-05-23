import { User } from "../entities/User";
import { UserReadDto } from "../controllers/dto/UserReadDto";
import { UserUpdateDto } from "../controllers/dto/UserUpdateDto";
import { BaseDtoService } from "./baseDtoService";
import { toUserDto } from "../controllers/dto/entityMappers";
import { hashPassword } from "./passwordUtils";
import { ObjectType } from "typeorm";

/**
 * Service for managing User entities and mapping them to UserReadDto.
 * Handles CRUD operations and ensures password is hashed when updated.
 */
export class UserService extends BaseDtoService<User, UserReadDto> {
  constructor(
    entity: ObjectType<User>,
    toDto: (entity: User) => UserReadDto,
    sortField: string = "username"
  ) {
    super(entity, toDto, sortField);
  }

  /**
   * Update a user by ID, hashing the password if provided.
   * @param id - User ID (number or string)
   * @param data - UserUpdateDto containing fields to update (username, role, password)
   * @returns The updated UserReadDto or null if not found.
   */
  async updateDto(
    id: number | string,
    data: UserUpdateDto
  ): Promise<UserReadDto | null> {
    const updateData: Partial<User> = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
    }
    const entity = await super.update(id, updateData);
    return entity ? toUserDto(entity) : null;
  }
}

/**
 * Singleton instance of UserService for use throughout the application.
 */
export const userService = new UserService(User, toUserDto);
