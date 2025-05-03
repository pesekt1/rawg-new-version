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

  @Column({ type: "varchar", unique: true })
  username: string;

  @Column({ type: "varchar" })
  passwordHash: string;

  @Column({ type: "varchar", default: "user" })
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

  @ManyToMany(() => Game, (game) => game.inLibraryOf, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "user_library_games",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "gamesId", referencedColumnName: "id" },
  })
  library: Game[];
}
