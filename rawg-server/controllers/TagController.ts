/**
 * TagController handles CRUD operations for Tag entities.
 * All endpoints return DTOs (TagReadDto) instead of raw entities.
 * Endpoints for creating, updating, and deleting require admin privileges.
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Tags,
  Security,
} from "tsoa";
import { tagService } from "../services/tagService";
import { ListResponse, IBaseController } from "./IBaseController";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { TagReadDto } from "./dto/TagReadDto";

/**
 * Controller for managing Tag entities.
 * Returns DTOs for all endpoints.
 */
@Route("tags")
@Tags("Tags")
export class TagController extends Controller implements IBaseController<TagReadDto> {
  /**
   * Get a list of all tags.
   * @returns ListResponse containing tag DTOs.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<TagReadDto>> {
    return formatListResponse(tagService);
  }

  /**
   * Get a tag by ID.
   * @param id Tag ID.
   * @returns Tag DTO or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<TagReadDto | null> {
    return tagService.getByIdDto(id);
  }

  /**
   * Create a new tag.
   * Requires admin access.
   * @param data Tag creation data.
   * @returns The created Tag DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<TagReadDto> {
    return tagService.createDto(data);
  }

  /**
   * Update an existing tag.
   * Requires admin access.
   * @param id Tag ID.
   * @param data Update data.
   * @returns Updated Tag DTO or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<TagReadDto | null> {
    return tagService.updateDto(id, data);
  }

  /**
   * Delete a tag by ID.
   * Requires admin access.
   * @param id Tag ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(tagService, id);
  }
}
