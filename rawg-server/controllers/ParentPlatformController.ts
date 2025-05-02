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
import { parentPlatformService } from "../services/parentPlatformService";
import { ParentPlatform } from "../entities/ParentPlatform";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";

@Route("platforms/lists/parents")
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
  @Security("admin")
  public async create(
    @Body() data: Partial<ParentPlatform>
  ): Promise<ParentPlatform> {
    return parentPlatformService.create(data);
  }

  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<ParentPlatform | null> {
    return parentPlatformService.update(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(parentPlatformService, id);
  }
}
