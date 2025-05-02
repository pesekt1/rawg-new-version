import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: "varchar", nullable: true })
  image_background?: string | null;

  @ManyToMany(() => Game, (game) => game.stores)
  games: Game[];
}
