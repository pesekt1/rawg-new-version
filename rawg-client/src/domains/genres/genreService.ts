import ApiClient from "../../services/api-client";
import { Genre } from "./Genre";

const genreService = new ApiClient<Genre>("/genres");

export default genreService;
