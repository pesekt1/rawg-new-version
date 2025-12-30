import { ObjectType } from "typeorm";
import { toUserDto } from "../controllers/dto/entityMappers";
import { UserReadDto } from "../controllers/dto/UserReadDto";
import { UserUpdateDto } from "../controllers/dto/UserUpdateDto";
import { User } from "../entities/User";
import { deleteAllUserAvatars } from "./azureBlobStorageService";
import { BaseDtoService } from "./baseDtoService";
import { hashPassword } from "./passwordUtils";

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

  /**
   * Update only the user's avatarUrl.
   */
  async updateAvatarUrl(
    id: number | string,
    avatarUrl: string
  ): Promise<UserReadDto | null> {
    const entity = await super.update(id, { avatarUrl });
    return entity ? toUserDto(entity) : null;
  }

  /**
   * Delete a user by ID, also removing all their avatars from Azure Blob Storage (best-effort).
   */
  async delete(id: number): Promise<boolean> {
    try {
      await deleteAllUserAvatars(id);
    } catch (e) {
      // best-effort cleanup; user deletion should still proceed
      console.warn("Failed to delete user avatar blobs:", e);
    }

    return super.delete(id);
  }
}

/**
 * Singleton instance of UserService for use throughout the application.
 */
export const userService = new UserService(User, toUserDto);
