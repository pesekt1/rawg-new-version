export default interface Review {
  userId: number;
  gameId: number;
  review: string;
  updated_at: Date;
  rating: number;
}
