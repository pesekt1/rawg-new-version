export interface IUserGameRelationController {
  get(userId: number): Promise<any>;
  add(userId: number, gameId: number): Promise<any>;
  remove(userId: number, gameId: number): Promise<any>;
}
