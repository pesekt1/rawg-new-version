import { Publisher } from "../entities/Publisher";
import { BaseService } from "./baseService";

export const publisherService = new BaseService(Publisher);

export const getPublishers = async () => {
  const publishers = await publisherService.getAll();
  return {
    count: publishers.length,
    results: publishers,
  };
};

export const getPublisherById = async (id: number | string) => {
  return publisherService.getById(id);
};

export const createPublisher = async (data: Partial<Publisher>) => {
  return publisherService.create(data);
};

export const updatePublisher = async (
  id: number | string,
  data: Partial<Publisher>
) => {
  return publisherService.update(id, data);
};

export const deletePublisher = async (id: number | string) => {
  return publisherService.delete(id);
};
