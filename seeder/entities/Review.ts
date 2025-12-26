import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Game } from "./Game";

@Entity()
export class Review {
  @PrimaryColumn({ type: "int" })
  userId: number;

  @PrimaryColumn({ type: "int" })
  gameId: number;

  @Column({ type: "text" })
  review: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @Column({ type: "int" })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Game, (game) => game.reviews, { onDelete: "CASCADE" })
  game: Game;
}
