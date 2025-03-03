import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  image_background?: string;

  @ManyToMany(() => Game, (game) => game.stores)
  games: Game[];
}
