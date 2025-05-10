/**
 * GenreController handles CRUD operations for Genre entities.
 * All endpoints return DTOs (EntityReadDto) instead of raw entities.
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
  Query,
} from "tsoa";
import { genreService } from "../services/genreService";
import { IBaseController } from "./IBaseController";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { EntityReadDto } from "./dto/EntityReadDto";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";

/**
 * Controller for managing Genre entities.
 * Returns DTOs for GET endpoints.
 */
@Route("genres")
@Tags("Genres")
export class GenreController
  extends Controller
  implements IBaseController<EntityReadDto>
{
  /**
   * Get a list of all genres with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing genre DTOs.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<EntityReadDto>> {
    const baseUrl = "genres"; // Define the baseUrl for this controller
    return formatListResponse(genreService, baseUrl, { page, page_size }); // Pass baseUrl
  }

  /**
   * Get a genre by ID.
   * @param id Genre ID.
   * @returns Genre DTO or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<EntityReadDto | null> {
    return genreService.getByIdDto(id);
  }

  /**
   * Create a new genre.
   * Requires admin access.
   * @param data Genre creation data.
   * @returns The created Genre DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<EntityReadDto> {
    return genreService.createDto(data);
  }

  /**
   * Update an existing genre.
   * Requires admin access.
   * @param id Genre ID.
   * @param data Update data.
   * @returns Updated Genre DTO or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<EntityReadDto | null> {
    return genreService.updateDto(id, data);
  }

  /**
   * Delete a genre by ID.
   * Requires admin access.
   * @param id Genre ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(genreService, id);
  }
}
