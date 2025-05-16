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
import { handleDelete } from "./controllerUtils";
import { Review } from "../entities/Review";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { ReviewCreateDto } from "./dto/ReviewCreateDto";
import { ReviewUpdateDto } from "./dto/ReviewUpdateDto";
import { Request as ExpressRequest } from "express";

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
   * @returns PaginatedResponse containing Review entities.
   */
  @Get("/")
  public async getAll(
    @Query() gameId?: number,
    @Query() userId?: number, // Add userId as an optional query parameter
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<Review>> {
    return reviewService.getFilteredReviews({
      gameId,
      userId,
      page,
      page_size,
    }); // Pass userId to the service
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
   * @param req The HTTP request object (to extract userId from the token).
   * @param data Review creation data.
   * @returns The created Review entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("jwt")
  public async create(
    @Request() req: ExpressRequest, // Use the aliased ExpressRequest type
    @Body() data: ReviewCreateDto
  ): Promise<Review> {
    const userId = req.user?.userId; // Extract userId from the token (set by expressAuthentication)
    const reviewData = {
      userId,
      gameId: data.gameId,
      review: data.review,
    };
    return reviewService.createReview(reviewData);
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
