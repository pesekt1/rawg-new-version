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
  Request,
} from "tsoa";
import { reviewService } from "../services/reviewService";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { ReviewCreateDto } from "./dto/ReviewCreateDto";
import { ReviewUpdateDto } from "./dto/ReviewUpdateDto";
import { Request as ExpressRequest } from "express";
import { ReviewReadDto } from "./dto/ReviewReadDto";

/**
 * Controller for managing Review entities.
 */
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * Get a list of all reviews with optional pagination and filtering by gameId and userId.
   * @param gameId Optional game ID to filter reviews.
   * @param userId Optional user ID to filter reviews.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing Review DTOs.
   */
  @Get("/")
  public async getAll(
    @Query() gameId?: number,
    @Query() userId?: number,
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<ReviewReadDto>> {
    return reviewService.getFilteredReviews({
      gameId,
      userId,
      page,
      page_size,
    });
  }

  /**
   * Get a review by composite key (userId and gameId).
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns ReviewReadDto or null if not found.
   */
  @Get("{userId}/{gameId}")
  public async getById(
    @Path() userId: number,
    @Path() gameId: number
  ): Promise<ReviewReadDto | null> {
    return reviewService.getByCompositeKey({ userId, gameId });
  }

  /**
   * Create a new review.
   * Requires user authentication.
   * @param req The HTTP request object (to extract userId from the token).
   * @param data Review creation data.
   * @returns The created Review DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("jwt")
  public async create(
    @Request() req: ExpressRequest,
    @Body() data: ReviewCreateDto
  ): Promise<ReviewReadDto> {
    const userId = req.user?.userId; // Extract userId from the token
    const reviewData = {
      userId,
      gameId: data.gameId,
      review: data.review,
      rating: data.rating,
    };
    return reviewService.createReview(reviewData);
  }

  /**
   * Update an existing review.
   * Requires user authentication.
   * @param userId User ID.
   * @param gameId Game ID.
   * @param data Update data containing the review text.
   * @returns Updated Review DTO or null if not found.
   */
  @Put("{userId}/{gameId}")
  @Security("jwt")
  public async update(
    @Path() userId: number,
    @Path() gameId: number,
    @Body() data: ReviewUpdateDto
  ): Promise<ReviewReadDto | null> {
    const compositeKey = { userId, gameId };
    return reviewService.updateReview(compositeKey, data);
  }

  /**
   * Delete a review by composite key (userId and gameId).
   * Requires user authentication.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Message indicating result.
   */
  @Delete("{userId}/{gameId}")
  @Security("jwt")
  public async delete(
    @Path() userId: number,
    @Path() gameId: number
  ): Promise<{ message: string }> {
    const compositeKey = { userId, gameId };
    const deleted = await reviewService.deleteReview(compositeKey);
    if (!deleted) {
      this.setStatus(404);
      return { message: "Review not found" };
    }
    return { message: "Review deleted successfully" };
  }
}
