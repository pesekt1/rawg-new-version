import ApiClient from "../../services/api-client";
import Review from "./Review";

export interface CreateReviewPayload {
  gameId: number;
  review: string;
  rating: number;
}

/**
 * Service for performing CRUD operations on Review entities.
 * Uses the generic ApiClient with the "/reviews" endpoint.
 */
const reviewService = new ApiClient<Review>("/reviews");

/**
 * Create review endpoint typically accepts a payload shape (not necessarily `Review`).
 */
const reviewCreateClient = new ApiClient<CreateReviewPayload>("/reviews");
export const createReview = (payload: CreateReviewPayload) =>
  reviewCreateClient.post(payload);

export default reviewService;
