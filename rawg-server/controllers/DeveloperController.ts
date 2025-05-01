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
import { developerService } from "../services/developerService";
import { Developer } from "../entities/Developer";
import { BaseController } from "./BaseController";

@Route("developers")
@Tags("Developers")
export class DeveloperController extends Controller {
  private base = new BaseController<Developer>(developerService);

  @Get("/")
  public async getAll(): Promise<Developer[]> {
    return this.base.getAll();
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Developer | null> {
    return this.base.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async create(@Body() data: Partial<Developer>): Promise<Developer> {
    return this.base.create(data);
  }

  @Put("{id}")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Developer>
  ): Promise<Developer | null> {
    return this.base.update(id, data);
  }

  @Delete("{id}")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    await this.base.delete(id);
    return { message: "Deleted" };
  }
}
