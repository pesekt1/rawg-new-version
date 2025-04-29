import ApiClient from "../../services/api-client";
import { Genre } from "./Genre";

/**
 * Service for performing CRUD operations on Genre entities.
 * Uses the generic ApiClient with the "/genres" endpoint.
 */
const genreService = new ApiClient<Genre>("/genres");

export default genreService;
