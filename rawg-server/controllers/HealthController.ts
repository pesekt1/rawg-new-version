import { Controller, Get, Route, Tags } from "tsoa";

@Route("health")
@Tags("Health")
export class HealthController extends Controller {
  /**
   * Health check endpoint.
   */
  @Get("/")
  public async health(): Promise<{ status: string }> {
    return { status: "ok" };
  }
}
