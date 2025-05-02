import { Controller, Get, Post, Delete, Route, Path, Tags } from "tsoa";
import { wishlistService } from "../services/wishlistService";
import { IUserGameRelationController } from "./IUserGameRelationController";

@Route("wishlist")
@Tags("Wishlist")
export class WishlistController
  extends Controller
  implements IUserGameRelationController
{
  @Get("{userId}")
  public async get(@Path() userId: number) {
    return wishlistService.get(userId);
  }

  @Post("{userId}/{gameId}")
  public async add(@Path() userId: number, @Path() gameId: number) {
    return wishlistService.add(userId, gameId);
  }

  @Delete("{userId}/{gameId}")
  public async remove(@Path() userId: number, @Path() gameId: number) {
    return wishlistService.remove(userId, gameId);
  }
}
