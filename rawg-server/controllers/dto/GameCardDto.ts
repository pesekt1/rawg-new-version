import { EntityWithIdDto } from "./EntityWithIdDto";

export type GameCardDto = {
  id: number;
  name: string;
  metacritic?: number;
  background_image?: string;
  rating_top?: number;
  parent_platforms: EntityWithIdDto[];
  wishlistedBy: { id: number }[];
  inLibraryOf: { id: number }[];
};
