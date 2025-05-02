import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Tags,
  Query,
  Security,
} from "tsoa";
import {
  getGame,
  getGames,
  getScreenshots,
  getTrailers,
  createGame,
  deleteGame,
  updateGame,
} from "../services/gameService";
import { Game } from "../entities/Game";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number,
    @Query() genreId?: string,
    @Query() storeId?: number,
    @Query() platformId?: number,
    @Query() publisherId?: number,
    @Query() developerId?: number,
    @Query() wishlistUserId?: number,
    @Query() libraryUserId?: number,
    @Query() sortOrder?: string,
    @Query() searchText?: string,
    @Query() tagId?: number
  ) {
    // Pass filter params as a plain object
    return getGames({
      page,
      page_size,
      genreId,
      storeId,
      platformId,
      publisherId,
      developerId,
      wishlistUserId,
      libraryUserId,
      sortOrder,
      searchText,
      tagId,
    });
  }

  @Get("{id}")
  public async getById(@Path() id: number): Promise<Game | any> {
    return getGame(id);
  }

  @Get("{id}/movies")
  public async getTrailers(@Path() id: number) {
    return getTrailers(id);
  }

  @Get("{id}/screenshots")
  public async getScreenshots(@Path() id: number) {
    return getScreenshots(id);
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Game>): Promise<Game> {
    return createGame(data);
  }

  @Patch("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: Partial<Game>
  ): Promise<Game> {
    return updateGame(id, data);
  }

  @Delete("{id}")
  @Security("admin")
  public async remove(@Path() id: number): Promise<void> {
    await deleteGame(id);
  }
}
