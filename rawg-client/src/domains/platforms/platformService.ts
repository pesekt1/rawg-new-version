import ApiClient from "../../services/api-client";
import { Platform } from "./Platform";

/**
 * Service for performing CRUD operations on Platform entities.
 * Uses the generic ApiClient with the "/platforms/lists/parents" endpoint.
 */
const platformService = new ApiClient<Platform>("/platforms/lists/parents");

export default platformService;
