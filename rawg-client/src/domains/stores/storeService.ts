import ApiClient from "../../services/api-client";
import { Store } from "./Store";

const storeService = new ApiClient<Store>("/stores");

export default storeService;
