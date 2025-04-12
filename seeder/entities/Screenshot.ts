import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Game } from "./Game";

@Entity("screenshots")
export class Screenshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ default: false })
  is_deleted: boolean;

  @ManyToOne(() => Game, (game) => game.screenshots)
  game: Game;
}
