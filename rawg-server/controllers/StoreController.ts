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

@Route("stores")
@Tags("Stores")
export class StoreController
  extends Controller
  implements IBaseController<Store>
{
  @Get("/")
  public async getAll(): Promise<ListResponse<Store>> {
    return formatListResponse(storeService);
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Store | null> {
    return storeService.getById(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Store>): Promise<Store> {
    return storeService.create(data);
  }

  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Store>
  ): Promise<Store | null> {
    return storeService.update(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(storeService, id);
  }
}
