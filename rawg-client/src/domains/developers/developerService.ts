import ApiClient from "../../services/api-client";
import { Developer } from "./Developer";

/**
 * Service for performing CRUD operations on Developer entities.
 * Uses the generic ApiClient with the "/developers" endpoint.
 */
const developerService = new ApiClient<Developer>("/developers");

export default developerService;
