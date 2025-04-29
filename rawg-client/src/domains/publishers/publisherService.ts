import ApiClient from "../../services/api-client";
import { Publisher } from "./Publisher";

/**
 * Service for performing CRUD operations on Publisher entities.
 * Uses the generic ApiClient with the "/publishers" endpoint.
 */
const publisherService = new ApiClient<Publisher>("/publishers");

export default publisherService;
