import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Genre } from "./Genre";
import { ParentPlatform } from "./ParentPlatform";
import { Store } from "./Store";
import { Publisher } from "./Publisher";
import { Trailer } from "./Trailer";
import { Screenshot } from "./Screenshot";
import { User } from "./User";
import { Developer } from "./Developer";
import { Tag } from "./Tag";

@Entity("games")
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "text", nullable: true })
  description_raw?: string;

  @Column({ type: "int", nullable: true })
  metacritic?: number;

  @Column({ type: "varchar", nullable: true })
  background_image?: string;

  @Column({ type: "float", nullable: true })
  rating?: number;

  @Column({ type: "varchar", nullable: true })
  released?: string;

  @Column({ type: "int", nullable: true })
  added?: number;

  @Column({ type: "int", nullable: true })
  rating_top?: number;

  @Column({ type: "varchar", nullable: true })
  website?: string;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => ParentPlatform, (platform) => platform.games)
  @JoinTable()
  parent_platforms: ParentPlatform[];

  @ManyToMany(() => Store, (store) => store.games)
  @JoinTable()
  stores: Store[];

  @ManyToMany(() => Publisher, (publisher) => publisher.games)
  @JoinTable()
  publishers: Publisher[];

  @ManyToMany(() => Developer, (developer) => developer.games)
  @JoinTable()
  developers: Developer[];

  @ManyToMany(() => Tag, (tag) => tag.games)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.wishlist)
  wishlistedBy: User[];

  @ManyToMany(() => User, (user) => user.library)
  inLibraryOf: User[];

  @OneToMany(() => Trailer, (trailer) => trailer.game)
  trailers: Trailer[];

  @OneToMany(() => Screenshot, (screenshot) => screenshot.game)
  screenshots: Screenshot[];
}
