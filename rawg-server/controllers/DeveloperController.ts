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

@Route("developers")
@Tags("Developers")
export class DeveloperController
  extends Controller
  implements IBaseController<Developer>
{
  @Get("/")
  public async getAll(): Promise<ListResponse<Developer>> {
    return formatListResponse(developerService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Developer | null> {
    return developerService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Developer>): Promise<Developer> {
    return developerService.create(data);
  }

  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Developer>
  ): Promise<Developer | null> {
    return developerService.update(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(developerService, id);
  }
}
