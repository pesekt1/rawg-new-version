import { ParentPlatform } from "../entities/ParentPlatform";
import { BaseService } from "./baseService";

export const parentPlatformService = new BaseService(ParentPlatform);

export const getAllParentPlatforms = async () => {
  return parentPlatformService.getAll();
};

export const getParentPlatformById = async (id: number | string) => {
  return parentPlatformService.getById(id);
};

export const createParentPlatform = async (data: Partial<ParentPlatform>) => {
  return parentPlatformService.create(data);
};

export const updateParentPlatform = async (
  id: number | string,
  data: Partial<ParentPlatform>
) => {
  return parentPlatformService.update(id, data);
};

export const deleteParentPlatform = async (id: number | string) => {
  return parentPlatformService.delete(id);
};
