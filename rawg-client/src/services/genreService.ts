import ApiClient from "./api-client";
import { Genre } from "../domains/genres/Genre";

const genreService = new ApiClient<Genre>("/genres");

export default genreService;
