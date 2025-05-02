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

@Route("tags")
@Tags("Tags")
export class TagController extends Controller implements IBaseController<Tag> {
  @Get("/")
  @Security("admin")
  public async getAll(): Promise<ListResponse<Tag>> {
    return formatListResponse(tagService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Tag | null> {
    return tagService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Tag>): Promise<Tag> {
    return tagService.create(data);
  }

  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Tag>
  ): Promise<Tag | null> {
    return tagService.update(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(tagService, id);
  }
}
