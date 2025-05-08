/**
 * StoreController handles CRUD operations for Store entities.
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
import { storeService } from "../services/storeService";
import { Store } from "../entities/Store";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

/**
 * Controller for managing Store entities.
 */
@Route("stores")
@Tags("Stores")
export class StoreController
  extends Controller
  implements IBaseController<Store>
{
  /**
   * Get a list of all stores.
   * @returns ListResponse containing stores.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<Store>> {
    return formatListResponse(storeService);
  }

  /**
   * Get a store by ID.
   * @param id Store ID.
   * @returns Store entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Store | null> {
    return storeService.getById(id);
  }

  /**
   * Create a new store.
   * Requires admin access.
   * @param data Store creation data.
   * @returns The created Store entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<Store> {
    return storeService.create(data);
  }

  /**
   * Update an existing store.
   * Requires admin access.
   * @param id Store ID.
   * @param data Update data.
   * @returns Updated Store entity or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Store | null> {
    return storeService.update(id, data);
  }

  /**
   * Delete a store by ID.
   * Requires admin access.
   * @param id Store ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(storeService, id);
  }
}
