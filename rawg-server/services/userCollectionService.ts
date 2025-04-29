import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { User } from "../entities/User";

export class UserCollectionService {
  constructor(private collection: "wishlist" | "library") {}

  async getUserWithCollection(userId: number) {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.findOne({
      where: { id: userId },
      relations: [this.collection],
    });
  }

  async addToCollection(userId: number, gameId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const gameRepo = AppDataSource.getRepository(Game);

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: [this.collection],
    });
    if (!user) throw new Error("User not found");

    const game = await gameRepo.findOneBy({ id: gameId });
    if (!game) throw new Error("Game not found");

    // @ts-ignore
    if (!user[this.collection].some((g: Game) => g.id === gameId)) {
      // @ts-ignore
      user[this.collection].push(game);
      await userRepo.save(user);
    }

    return user;
  }

  async removeFromCollection(userId: number, gameId: number) {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: [this.collection],
    });
    if (!user) throw new Error("User not found");

    // @ts-ignore
    user[this.collection] = user[this.collection].filter(
      (g: Game) => g.id !== gameId
    );
    await userRepo.save(user);

    return user;
  }
}

// Optionally export instances for convenience
export const wishlistCollectionService = new UserCollectionService("wishlist");
export const libraryCollectionService = new UserCollectionService("library");
