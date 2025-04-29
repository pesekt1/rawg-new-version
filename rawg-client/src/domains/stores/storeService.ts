import ApiClient from "../../services/api-client";
import { Store } from "./Store";

/**
 * Service for performing CRUD operations on Store entities.
 * Uses the generic ApiClient with the "/stores" endpoint.
 */
const storeService = new ApiClient<Store>("/stores");

export default storeService;
