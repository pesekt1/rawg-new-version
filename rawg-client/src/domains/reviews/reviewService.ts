import ApiClient from "../../services/api-client";
import Review from "./Review";

/**
 * Service for performing CRUD operations on Review entities.
 * Uses the generic ApiClient with the "/reviews" endpoint.
 */
const reviewService = new ApiClient<Review>("/reviews");

export default reviewService;
