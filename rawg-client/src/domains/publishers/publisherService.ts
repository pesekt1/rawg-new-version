import ApiClient from "../../services/api-client";
import { Publisher } from "./Publisher";

const publisherService = new ApiClient<Publisher>("/publishers");

export default publisherService;
