import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { User } from "../entities/User";

export const getUserWithWishlist = async (userId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.findOne({
    where: { id: userId },
    relations: ["wishlist"],
  });
};

export const addToWishlist = async (userId: number, gameId: number) => {
  const userRepo = AppDataSource.getRepository(User);
  const gameRepo = AppDataSource.getRepository(Game);

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ["wishlist"],
  });
  if (!user) throw new Error("User not found");

  const game = await gameRepo.findOneBy({ id: gameId });
  if (!game) throw new Error("Game not found");

  // Add game to wishlist if not already present
  if (!user.wishlist.some((g) => g.id === gameId)) {
    user.wishlist.push(game);
    await userRepo.save(user);
  }

  return user;
};

export const removeFromWishlist = async (userId: number, gameId: number) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ["wishlist"],
  });
  if (!user) throw new Error("User not found");

  user.wishlist = user.wishlist.filter((g) => g.id !== gameId);
  await userRepo.save(user);

  return user;
};
