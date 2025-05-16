import { Review } from "../entities/Review";
import { BaseService } from "./baseService";
import { ReviewUpdateDto } from "../controllers/dto/ReviewUpdateDto";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";

interface CreateReviewPayload {
  userId: number;
  gameId: number;
  review: string;
}

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

  /**
   * Get reviews with optional filtering by gameId and pagination.
   * @param filters Object containing gameId, page, and page_size.
   * @returns PaginatedResponse containing filtered Review entities.
   */
  async getFilteredReviews(filters: {
    gameId?: number;
    userId?: number; // Add userId to the filter options
    page?: number;
    page_size?: number;
  }): Promise<PaginatedResponse<Review>> {
    const { gameId, userId, page = 1, page_size = 10 } = filters;

    const queryBuilder = this.repository.createQueryBuilder("review");

    if (gameId) {
      queryBuilder.where("review.gameId = :gameId", { gameId });
    }

    if (userId) {
      queryBuilder.andWhere("review.userId = :userId", { userId });
    }

    queryBuilder.skip((page - 1) * page_size).take(page_size);

    const [results, count] = await queryBuilder.getManyAndCount();

    return {
      count,
      next: count > page * page_size ? `${page + 1}` : null,
      results,
    };
  }

  /**
   * Delete a review using a composite key (userId, gameId).
   * @param compositeKey The composite key containing userId and gameId.
   * @returns True if the review was deleted, false otherwise.
   */
  async deleteReview(compositeKey: {
    userId: number;
    gameId: number;
  }): Promise<boolean> {
    const result = await this.repository.delete(compositeKey);
    return (result.affected ?? 0) > 0; // Use nullish coalescing to handle null or undefined
  }
}

export const reviewService = new ReviewService();
