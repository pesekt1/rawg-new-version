import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity()
export class ParentPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToMany(() => Game, (game) => game.parentPlatforms)
  games: Game[];
}
