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

@Route("genres")
@Tags("Genres")
export class GenreController
  extends Controller
  implements IBaseController<Genre>
{
  @Get("/")
  public async getAll(): Promise<ListResponse<Genre>> {
    return formatListResponse(genreService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Genre | null> {
    return genreService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Genre>): Promise<Genre> {
    return genreService.create(data);
  }

  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<Genre | null> {
    return genreService.update(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(genreService, id);
  }
}
