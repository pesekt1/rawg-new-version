import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Game } from "./Game";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: "user" })
  role: "admin" | "user";

  @ManyToMany(() => Game, (game) => game.wishlistedBy, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "user_wishlist_games",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "gamesId", referencedColumnName: "id" },
  })
  wishlist: Game[];
}
