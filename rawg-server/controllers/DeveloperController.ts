/**
 * DeveloperController handles CRUD operations for Developer entities.
 * Secured endpoints require admin privileges.
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
import { developerService } from "../services/developerService";
import { Developer } from "../entities/Developer";
import { ListResponse, IBaseController } from "./IBaseController";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

/**
 * Controller for managing Developer entities.
 */
@Route("developers")
@Tags("Developers")
export class DeveloperController
  extends Controller
  implements IBaseController<Developer>
{
  /**
   * Get a list of all developers.
   * @returns ListResponse containing developers.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<Developer>> {
    return formatListResponse(developerService);
  }

  /**
   * Get a developer by ID.
   * @param id Developer ID.
   * @returns Developer entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Developer | null> {
    return developerService.getById(id);
  }

  /**
   * Create a new developer.
   * Requires admin access.
   * @param data Developer creation data.
   * @returns The created Developer entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<Developer> {
    return developerService.create(data);
  }

  /**
   * Update an existing developer.
   * Requires admin access.
   * @param id Developer ID.
   * @param data Update data.
   * @returns Updated Developer entity or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Developer | null> {
    return developerService.update(id, data);
  }

  /**
   * Delete a developer by ID.
   * Requires admin access.
   * @param id Developer ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(developerService, id);
  }
}
