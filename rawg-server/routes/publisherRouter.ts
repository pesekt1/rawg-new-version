import { createBaseRouter } from "./baseRouter";
import { publisherService } from "../services/publisherService";

export default createBaseRouter(publisherService);
