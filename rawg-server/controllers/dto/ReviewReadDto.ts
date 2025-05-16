/**
 * DTO for reading reviews with simplified fields.
 */
export interface ReviewReadDto {
  userId: number;
  gameId: number;
  review: string;
}
