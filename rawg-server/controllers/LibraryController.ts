import { Controller, Get, Post, Delete, Route, Path, Tags } from "tsoa";
import { gameLibraryService } from "../services/gameLibraryService";
import { IUserGameRelationController } from "./IUserGameRelationController";

@Route("library")
@Tags("Library")
export class LibraryController
  extends Controller
  implements IUserGameRelationController
{
  @Get("{userId}")
  public async get(@Path() userId: number) {
    return gameLibraryService.get(userId);
  }

  @Post("{userId}/{gameId}")
  public async add(@Path() userId: number, @Path() gameId: number) {
    return gameLibraryService.add(userId, gameId);
  }

  @Delete("{userId}/{gameId}")
  public async remove(@Path() userId: number, @Path() gameId: number) {
    return gameLibraryService.remove(userId, gameId);
  }
}
