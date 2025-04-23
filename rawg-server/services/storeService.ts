import { Store } from "../entities/Store";
import { BaseService } from "./baseService";

export const storeService = new BaseService(Store);

export const getAllStores = async () => {
  return storeService.getAll();
};

export const getStoreById = async (id: number | string) => {
  return storeService.getById(id);
};

export const createStore = async (data: Partial<Store>) => {
  return storeService.create(data);
};

export const updateStore = async (
  id: number | string,
  data: Partial<Store>
) => {
  return storeService.update(id, data);
};

export const deleteStore = async (id: number | string) => {
  return storeService.delete(id);
};
