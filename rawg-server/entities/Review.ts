import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Game } from "./Game";

@Entity()
export class Review {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  gameId: number;

  @Column({ type: "text" })
  review: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Game, (game) => game.reviews, { onDelete: "CASCADE" })
  game: Game;
}
