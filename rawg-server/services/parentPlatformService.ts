import { AppDataSource } from "../startup/data-source";
import { ParentPlatform } from "../entities/ParentPlatform";

const parentPlatformRepository = AppDataSource.getRepository(ParentPlatform);

export const getAllParentPlatforms = async (): Promise<ParentPlatform[]> => {
  return parentPlatformRepository.find();
};
