import ApiClient from "../../services/api-client";
import { Developer } from "./Developer";

const developerService = new ApiClient<Developer>("/developers");

export default developerService;
