import { Developer } from "../entities/Developer";
import { BaseService } from "./baseService";

export const developerService = new BaseService(Developer);

export const getDevelopers = async () => {
  const developers = await developerService.getAll();
  return {
    count: developers.length,
    results: developers,
  };
};

export const getDeveloperById = async (id: number | string) => {
  return developerService.getById(id);
};

export const createDeveloper = async (data: Partial<Developer>) => {
  return developerService.create(data);
};

export const updateDeveloper = async (
  id: number | string,
  data: Partial<Developer>
) => {
  return developerService.update(id, data);
};

export const deleteDeveloper = async (id: number | string) => {
  return developerService.delete(id);
};
