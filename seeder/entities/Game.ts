import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Developer } from "./Developer";
import { Genre } from "./Genre";
import { ParentPlatform } from "./ParentPlatform";
import { Publisher } from "./Publisher";
import { Review } from "./Review";
import { Screenshot } from "./Screenshot";
import { Store } from "./Store";
import { Tag } from "./Tag";
import { Trailer } from "./Trailer";
import { User } from "./User";

@Entity("games")
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: "text", nullable: true })
  description_raw?: string;

  @Column({ nullable: true })
  metacritic?: number;

  @Column({ nullable: true })
  background_image?: string;

  @Column({ type: "float", nullable: true })
  rating?: number;

  @Column({ nullable: true })
  released?: string;

  @Column({ nullable: true })
  added?: number;

  @Column({ nullable: true })
  rating_top?: number;

  @Column({ nullable: true })
  website?: string;

  @Column({ type: "text", nullable: true })
  summary?: string;

  @Column({ type: "datetime", nullable: true })
  summaryUpdatedAt?: Date;

  @Column({ type: "varchar", length: 64, nullable: true })
  summaryAiModel?: string;

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

  @OneToMany(() => Review, (review) => review.game, { cascade: true })
  reviews: Review[];
}
