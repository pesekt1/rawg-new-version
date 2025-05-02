/**
 * AuthController handles user registration and authentication.
 * Provides endpoints for registering new users and logging in.
 */

import { Controller, Post, Route, Body, SuccessResponse, Tags } from "tsoa";
import { AuthService } from "../services/authService";

interface RegisterRequest {
  username: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Controller for authentication operations.
 */
@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  /**
   * Register a new user.
   * @param body Registration data (username and password).
   * @returns The created user's id, username, and role.
   */
  @SuccessResponse("201", "Created")
  @Post("register")
  public async register(
    @Body() body: RegisterRequest
  ): Promise<{ id: number; username: string; role: string }> {
    const { username, password } = body;
    return AuthService.register(username, password);
  }

  /**
   * Authenticate a user and return a JWT token.
   * @param body Login data (username and password).
   * @returns An object containing the authentication token.
   */
  @Post("login")
  public async login(@Body() body: LoginRequest): Promise<{ token: string }> {
    const { username, password } = body;
    return AuthService.login(username, password);
  }
}
