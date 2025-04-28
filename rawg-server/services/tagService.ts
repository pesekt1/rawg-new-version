import { Tag } from "../entities/Tag";
import { BaseService } from "./baseService";

export const tagService = new BaseService(Tag);

export const getTags = async () => {
  const tags = await tagService.getAll();
  return {
    count: tags.length,
    results: tags,
  };
};

export const getTagById = async (id: number | string) => {
  return tagService.getById(id);
};

export const createTag = async (data: Partial<Tag>) => {
  return tagService.create(data);
};

export const updateTag = async (id: number | string, data: Partial<Tag>) => {
  return tagService.update(id, data);
};

export const deleteTag = async (id: number | string) => {
  return tagService.delete(id);
};
