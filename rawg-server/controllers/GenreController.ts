/**
 * GenreController handles CRUD operations for Genre entities.
 * Some endpoints require admin privileges.
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
import { genreService } from "../services/genreService";
import { Genre } from "../entities/Genre";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { IBaseController, ListResponse } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

/**
 * Controller for managing Genre entities.
 */
@Route("genres")
@Tags("Genres")
export class GenreController
  extends Controller
  implements IBaseController<Genre>
{
  /**
   * Get a list of all genres.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<Genre>> {
    return formatListResponse(genreService);
  }

  /**
   * Get a genre by ID.
   * @param id Genre ID.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Genre | null> {
    return genreService.getById(id);
  }

  /**
   * Create a new genre.
   * Requires admin access.
   * @param data Genre creation data.
   * @returns The created Genre entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<Genre> {
    return genreService.create(data);
  }

  /**
   * Update an existing genre.
   * Requires admin access.
   * @param id Genre ID.
   * @param data Update data.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Genre | null> {
    return genreService.update(id, data);
  }

  /**
   * Delete a genre by ID.
   * Requires admin access.
   * @param id Genre ID.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(genreService, id);
  }
}
