import ApiClient from "../../services/api-client";
import { Platform } from "./Platform";

const platformService = new ApiClient<Platform>("/platforms/lists/parents");

export default platformService;
