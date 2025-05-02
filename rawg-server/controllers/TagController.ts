/**
 * TagController handles CRUD operations for Tag entities.
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
import { Tag } from "../entities/Tag";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

/**
 * Controller for managing Tag entities.
 */
@Route("tags")
@Tags("Tags")
export class TagController extends Controller implements IBaseController<Tag> {
  /**
   * Get a list of all tags.
   * @returns ListResponse containing tags.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<Tag>> {
    return formatListResponse(tagService);
  }

  /**
   * Get a tag by ID.
   * @param id Tag ID.
   * @returns Tag entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Tag | null> {
    return tagService.getById(id);
  }

  /**
   * Create a new tag.
   * Requires admin access.
   * @param data Partial tag data.
   * @returns The created Tag entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Tag>): Promise<Tag> {
    return tagService.create(data);
  }

  /**
   * Update an existing tag.
   * Requires admin access.
   * @param id Tag ID.
   * @param data Update data.
   * @returns Updated Tag entity or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Tag | null> {
    return tagService.update(id, data);
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
