import { AppDataSource } from "../startup/data-source";
import { Publisher } from "../entities/Publisher";

const publisherRepository = AppDataSource.getRepository(Publisher);

export const getPublishers = async () => {
  const publishers = await publisherRepository.find();
  return {
    count: publishers.length,
    results: publishers,
  };
};
