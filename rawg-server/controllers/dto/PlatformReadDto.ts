import { EntityReadDto } from "./EntityReadDto";

/**
 * DTO for ParentPlatform entity, without image_background.
 */
export type PlatformReadDto = Omit<EntityReadDto, "image_background">;
