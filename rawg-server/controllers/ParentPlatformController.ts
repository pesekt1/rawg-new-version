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
import { parentPlatformService } from "../services/parentPlatformService";
import { ParentPlatform } from "../entities/ParentPlatform";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";

@Route("parent-platforms")
@Tags("ParentPlatforms")
export class ParentPlatformController
  extends Controller
  implements IBaseController<ParentPlatform>
{
  @Get("/")
  public async getAll(): Promise<ListResponse<ParentPlatform>> {
    return formatListResponse(parentPlatformService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<ParentPlatform | null> {
    return parentPlatformService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async create(
    @Body() data: Partial<ParentPlatform>
  ): Promise<ParentPlatform> {
    return parentPlatformService.create(data);
  }

  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() data: Partial<ParentPlatform>
  ): Promise<ParentPlatform | null> {
    return parentPlatformService.update(id, data);
  }

  @Delete("{id}")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(parentPlatformService, id);
  }
}
