import { axiosInstance } from "./api-client";

// This client is used to manage the user-game relation, such as adding or removing games from a user's library.
// It is a generic client that can be used for different types of relations, such as wishlist or library.
export class UserGameRelationClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getUserList = (userId: number): Promise<T[]> =>
    axiosInstance
      .get<T[]>(`${this.endpoint}/${userId}`)
      .then((res) => res.data);

  add = (userId: number, gameId: number): Promise<T> =>
    axiosInstance
      .post<T>(`${this.endpoint}/${userId}/${gameId}`)
      .then((res) => res.data);

  remove = (userId: number, gameId: number): Promise<void> =>
    axiosInstance
      .delete<void>(`${this.endpoint}/${userId}/${gameId}`)
      .then((res) => res.data);
}
