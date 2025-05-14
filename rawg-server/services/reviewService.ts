import { Review } from "../entities/Review";
import { BaseService } from "./baseService";
import { ReviewUpdateDto } from "../controllers/dto/ReviewUpdateDto";

/**
 * Service instance for managing reviews.
 * Provides CRUD operations for Review entities.
 */
export class ReviewService extends BaseService<Review> {
  constructor() {
    super(Review);
  }

  /**
   * Update a review using a composite key (userId, gameId).
   * @param compositeKey The composite key containing userId and gameId.
   * @param data ReviewUpdateDto containing the review text to update.
   * @returns Updated Review entity or null if not found.
   */
  async updateReview(
    compositeKey: { userId: number; gameId: number },
    data: ReviewUpdateDto
  ): Promise<Review | null> {
    const review = await this.repository.findOneBy(compositeKey);
    if (!review) return null;
    this.repository.merge(review, data);
    return this.repository.save(review);
  }

  /**
   * Create a new review.
   * @param data The review creation payload.
   * @returns The created Review entity.
   */
  async createReview(data: CreateReviewPayload): Promise<Review> {
    const review = this.repository.create({
      userId: data.userId, // Explicitly set userId
      gameId: data.gameId, // Explicitly set gameId
      review: data.review,
      user: { id: data.userId }, // Set the user relationship
      game: { id: data.gameId }, // Set the game relationship
    });
    return this.repository.save(review);
  }
}

export const reviewService = new ReviewService();

interface CreateReviewPayload {
  userId: number;
  gameId: number;
  review: string;
}
