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
} from "tsoa";
import { publisherService } from "../services/publisherService";
import { Publisher } from "../entities/Publisher";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";

@Route("publishers")
@Tags("Publishers")
export class PublisherController
  extends Controller
  implements IBaseController<Publisher>
{
  @Get("/")
  public async getAll(): Promise<ListResponse<Publisher>> {
    return formatListResponse(publisherService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Publisher | null> {
    return publisherService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async create(@Body() data: Partial<Publisher>): Promise<Publisher> {
    return publisherService.create(data);
  }

  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Publisher>
  ): Promise<Publisher | null> {
    return publisherService.update(id, data);
  }

  @Delete("{id}")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(publisherService, id);
  }
}
