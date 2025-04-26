import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { User } from "../entities/User";

export const getUserWithLibrary = async (userId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.findOne({
    where: { id: userId },
    relations: ["library"],
  });
};

export const addToLibrary = async (userId: number, gameId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const gameRepo = AppDataSource.getRepository(Game);

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ["library"],
  });
  if (!user) throw new Error("User not found");

  const game = await gameRepo.findOneBy({ id: gameId });
  if (!game) throw new Error("Game not found");

  // Add game to library if not already present
  if (!user.library.some((g) => g.id === gameId)) {
    user.library.push(game);
    await userRepo.save(user);
  }

  return user;
};

export const removeFromLibrary = async (userId: number, gameId: number) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ["library"],
  });
  if (!user) throw new Error("User not found");

  user.library = user.library.filter((g) => g.id !== gameId);
  await userRepo.save(user);

  return user;
};
