import ApiClient, { axiosInstance } from "../../services/api-client";
import { Game } from "../games/Game";

class LibraryService extends ApiClient<Game> {
  getUserLibrary = (userId: number) =>
    axiosInstance.get(`/library/${userId}`).then((res) => res.data);

  addToLibrary = (userId: number, gameId: number) =>
    axiosInstance.post(`/library/${userId}/${gameId}`);

  removeFromLibrary = (userId: number, gameId: number) =>
    axiosInstance.delete(`/library/${userId}/${gameId}`);
}

const libraryService = new LibraryService("/library");

export default libraryService;
