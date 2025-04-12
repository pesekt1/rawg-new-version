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

  @OneToMany(() => Trailer, (trailer) => trailer.game) // Define the one-to-many relationship
  trailers: Trailer[];
}
