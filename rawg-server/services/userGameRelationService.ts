import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { User } from "../entities/User";

/**
 * Service for managing user-game relations (wishlist, library).
 */
export class UserGameRelationService {
  /**
   * @param collection The relation type: "wishlist" or "library".
   */
  constructor(private collection: "wishlist" | "library") {}

  /**
   * Get the user's wishlist or library.
   * @param userId User ID
   * @returns Promise resolving to the specific relation (wishlist or library).
   */
  async get(userId: number) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: [this.collection], // Fetch only the specified relation
    });

    if (!user) throw new Error("User not found");

    // @ts-ignore
    return user[this.collection]; // Return only the requested collection
  }

  /**
   * Add a game to the user's wishlist or library.
   * @param userId User ID
   * @param gameId Game ID
   * @returns Promise resolving to the updated user.
   */
  async add(userId: number, gameId: number) {
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

  /**
   * Remove a game from the user's wishlist or library.
   * @param userId User ID
   * @param gameId Game ID
   * @returns Promise resolving to the updated user.
   */
  async remove(userId: number, gameId: number) {
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
