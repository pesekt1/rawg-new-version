/**
 * ReviewController handles CRUD operations for Review entities.
 * All endpoints return raw Review entities.
 * Some endpoints require admin privileges.
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Tags,
  Query,
  Security,
} from "tsoa";
import { reviewService } from "../services/reviewService";
import { formatEntityList, handleDelete } from "./controllerUtils";
import { Review } from "../entities/Review";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { ReviewCreateDto } from "./dto/ReviewCreateDto";
import { ReviewUpdateDto } from "./dto/ReviewUpdateDto";

/**
 * Controller for managing Review entities.
 */
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * Get a list of all reviews with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing Review entities.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<Review>> {
    const baseUrl = "reviews";
    return formatEntityList(reviewService, baseUrl, { page, page_size });
  }

  /**
   * Get a review by ID.
   * @param id Review ID.
   * @returns Review entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Review | null> {
    return reviewService.getById(id);
  }

  /**
   * Create a new review.
   * Requires user authentication.
   * @param data Review creation data.
   * @returns The created Review entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("jwt")
  public async create(@Body() data: ReviewCreateDto): Promise<Review> {
    const reviewData = {
      user: { id: data.userId },
      game: { id: data.gameId },
      review: data.review,
    };
    return reviewService.create(reviewData);
  }

  /**
   * Update an existing review.
   * Requires user authentication.
   * @param userId User ID.
   * @param gameId Game ID.
   * @param data Update data containing the review text.
   * @returns Updated Review entity or null if not found.
   */
  @Put("{userId}/{gameId}")
  @Security("jwt")
  public async update(
    @Path() userId: number,
    @Path() gameId: number,
    @Body() data: ReviewUpdateDto
  ): Promise<Review | null> {
    const compositeKey = { userId, gameId };
    return reviewService.updateReview(compositeKey, data);
  }

  /**
   * Delete a review by ID.
   * Requires user authentication.
   * @param id Review ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("jwt")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(reviewService, id);
  }
}
