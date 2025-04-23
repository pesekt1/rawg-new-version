import { Genre } from "../entities/Genre";
import { BaseService } from "./baseService";

export const genreService = new BaseService(Genre);

export const getAllGenres = async () => {
  return genreService.getAll();
};

export const getGenreById = async (id: number | string) => {
  return genreService.getById(id);
};

export const createGenre = async (data: Partial<Genre>) => {
  return genreService.create(data);
};

export const updateGenre = async (
  id: number | string,
  data: Partial<Genre>
) => {
  return genreService.update(id, data);
};

export const deleteGenre = async (id: number | string) => {
  return genreService.delete(id);
};
