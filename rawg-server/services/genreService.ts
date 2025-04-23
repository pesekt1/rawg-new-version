import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";

const genreRepository = AppDataSource.getRepository(Genre);

export const getAllGenres = async (): Promise<Genre[]> => {
  return genreRepository.find();
};
