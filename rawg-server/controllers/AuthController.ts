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

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @SuccessResponse("201", "Created")
  @Post("register")
  public async register(
    @Body() body: RegisterRequest
  ): Promise<{ id: number; username: string; role: string }> {
    const { username, password } = body;
    return AuthService.register(username, password);
  }

  @Post("login")
  public async login(@Body() body: LoginRequest): Promise<{ token: string }> {
    const { username, password } = body;
    return AuthService.login(username, password);
  }
}
