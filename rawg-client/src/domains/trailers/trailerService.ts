import ApiClient from "../../services/api-client";
import { Trailer } from "./Trailer";

/**
 * Service for performing CRUD operations on Trailer entities.
 * Uses the generic ApiClient with the "/trailers" endpoint.
 */
const trailerService = new ApiClient<Trailer>("/trailers");

export default trailerService;
