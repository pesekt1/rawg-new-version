import ApiClient, { axiosInstance } from "../../services/api-client";
import { Game } from "../games/Game";

class WishListService extends ApiClient<Game> {
  getUserWishlist = (userId: number) =>
    axiosInstance.get(`/wishlist/${userId}`).then((res) => res.data);

  addToWishlist = (userId: number, gameId: number) =>
    axiosInstance.post(`/wishlist/${userId}/${gameId}`);

  removeFromWishlist = (userId: number, gameId: number) =>
    axiosInstance.delete(`/wishlist/${userId}/${gameId}`);
}

const wishlistService = new WishListService("/wishlist");

export default wishlistService;
