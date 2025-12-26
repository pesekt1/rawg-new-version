import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";
import { Review } from "./Review";

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

  @OneToMany(() => Review, (review) => review.user, { cascade: true })
  reviews: Review[];
}
