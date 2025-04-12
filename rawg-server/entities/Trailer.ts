import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Game } from "./Game";

@Entity("trailers")
export class Trailer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  preview: string;

  @Column({ name: "data_480" })
  data480: string;

  @Column({ name: "data_max" })
  dataMax: string;

  @ManyToOne(() => Game, (game) => game.trailers)
  game: Game;
}
