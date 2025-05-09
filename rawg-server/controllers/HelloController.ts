import { Controller, Get, Route } from "tsoa";

// This controller is only for a basic "hello world" test endpoint.
// If you do not need a test or demo endpoint, you can safely delete this file and its route.

@Route("hello")
export class HelloController extends Controller {
  @Get("/")
  public async sayHello(): Promise<{ message: string }> {
    return { message: "Hello from tsoa!" };
  }
}
