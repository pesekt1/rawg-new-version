import ApiClient from "../../services/api-client";
import { Screenshot } from "./Screenshot";

/**
 * Service for performing CRUD operations on Screenshot entities.
 * Uses the generic ApiClient with the "/screenshots" endpoint.
 */
const screenshotService = new ApiClient<Screenshot>("/screenshots");

export default screenshotService;
