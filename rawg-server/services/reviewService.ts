import { ReviewReadDto } from "../controllers/dto/ReviewReadDto";
import { ReviewUpdateDto } from "../controllers/dto/ReviewUpdateDto";
import { Review } from "../entities/Review";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { AppDataSource } from "../startup/data-source";

interface CreateReviewPayload {
  userId: number;
  gameId: number;
  review: string;
  rating: number;
}

/**
 * Service instance for managing reviews.
 * Provides CRUD operations for Review entities.
 */
export class ReviewService {
  /**
   * Repository for accessing the Review entity.
   */
  private repository = AppDataSource.getRepository(Review);

  /**
   * Transform a Review entity into a ReviewReadDto.
   * @param review The Review entity to transform.
   * @returns The transformed ReviewReadDto.
   */
  private toDto(review: Review): ReviewReadDto {
    return {
      userId: review.userId,
      gameId: review.gameId,
      review: review.review,
      updated_at: review.updated_at,
      rating: review.rating,
    };
  }

  /**
   * Get reviews with optional filtering by gameId and userId, and pagination.
   * @param filters Object containing optional filters: gameId, userId, page, and page_size.
   * @returns A paginated response containing filtered Review DTOs.
   */
  async getFilteredReviews(filters: {
    gameId?: number;
    userId?: number;
    page?: number;
    page_size?: number;
  }): Promise<PaginatedResponse<ReviewReadDto>> {
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

    const dtoResults = results.map(this.toDto);

    return {
      count,
      next: count > page * page_size ? `${page + 1}` : null,
      results: dtoResults,
    };
  }

  /**
   * Update a review using a composite key (userId, gameId).
   * @param compositeKey The composite key containing userId and gameId.
   * @param data The data to update the review with.
   * @returns The updated Review DTO or null if the review was not found.
   */
  async updateReview(
    compositeKey: { userId: number; gameId: number },
    data: ReviewUpdateDto
  ): Promise<ReviewReadDto | null> {
    const review = await this.repository.findOneBy(compositeKey);
    if (!review) return null;
    this.repository.merge(review, data);
    const updatedReview = await this.repository.save(review);
    return this.toDto(updatedReview);
  }

  /**
   * Create a new review.
   * @param data The data for creating the review.
   * @returns The created Review DTO.
   */
  async createReview(data: CreateReviewPayload): Promise<ReviewReadDto> {
    const review = this.repository.create({
      userId: data.userId,
      gameId: data.gameId,
      review: data.review,
      rating: data.rating,
      user: { id: data.userId },
      game: { id: data.gameId },
    });
    const createdReview = await this.repository.save(review);
    return this.toDto(createdReview);
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
    return (result.affected ?? 0) > 0;
  }

  /**
   * Get a review by composite key (userId, gameId).
   * @param compositeKey The composite key containing userId and gameId.
   * @returns The Review DTO or null if the review was not found.
   */
  async getByCompositeKey(compositeKey: {
    userId: number;
    gameId: number;
  }): Promise<ReviewReadDto | null> {
    const review = await this.repository.findOneBy(compositeKey);
    return review ? this.toDto(review) : null;
  }

  async getMostRecentByGameId(
    gameId: number,
    limit = 15
  ): Promise<ReviewReadDto[]> {
    const reviews = await this.repository
      .createQueryBuilder("review")
      .where("review.gameId = :gameId", { gameId })
      .orderBy("review.updated_at", "DESC")
      .take(limit)
      .getMany();

    return reviews.map(this.toDto);
  }
}

export const reviewService = new ReviewService();
