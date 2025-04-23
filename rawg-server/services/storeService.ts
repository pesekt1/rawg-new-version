import { AppDataSource } from "../startup/data-source";
import { Store } from "../entities/Store";

const storeRepository = AppDataSource.getRepository(Store);

export const getAllStores = async (): Promise<Store[]> => {
  return storeRepository.find();
};
