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
import { genreService } from "../services/genreService";
import { Genre } from "../entities/Genre";
import { BaseController } from "./BaseController";

@Route("genres")
@Tags("Genres")
export class GenreController extends Controller {
  private base = new BaseController<Genre>(genreService);

  @Get("/")
  public async getAll(): Promise<Genre[]> {
    return this.base.getAll();
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Genre | null> {
    return this.base.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async create(@Body() data: Partial<Genre>): Promise<Genre> {
    return this.base.create(data);
  }

  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Genre>
  ): Promise<Genre | null> {
    return this.base.update(id, data);
  }

  @Delete("{id}")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    await this.base.delete(id);
    return { message: "Deleted" };
  }
}
