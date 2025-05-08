/**
 * PublisherController handles CRUD operations for Publisher entities.
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
import { publisherService } from "../services/publisherService";
import { Publisher } from "../entities/Publisher";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

/**
 * Controller for managing Publisher entities.
 */
@Route("publishers")
@Tags("Publishers")
export class PublisherController
  extends Controller
  implements IBaseController<Publisher>
{
  /**
   * Get a list of all publishers.
   * @returns ListResponse containing publishers.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<Publisher>> {
    return formatListResponse(publisherService);
  }

  /**
   * Get a publisher by ID.
   * @param id Publisher ID.
   * @returns Publisher entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Publisher | null> {
    return publisherService.getById(id);
  }

  /**
   * Create a new publisher.
   * Requires admin access.
   * @param data Publisher creation data.
   * @returns The created Publisher entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<Publisher> {
    return publisherService.create(data);
  }

  /**
   * Update an existing publisher.
   * Requires admin access.
   * @param id Publisher ID.
   * @param data Update data.
   * @returns Updated Publisher entity or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Publisher | null> {
    return publisherService.update(id, data);
  }

  /**
   * Delete a publisher by ID.
   * Requires admin access.
   * @param id Publisher ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(publisherService, id);
  }
}
