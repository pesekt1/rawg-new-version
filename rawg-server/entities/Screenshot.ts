import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Game } from "./Game";

@Entity("screenshots")
export class Screenshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  image: string;

  @Column({ type: "int" })
  width: number;

  @Column({ type: "int" })
  height: number;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @ManyToOne(() => Game, (game) => game.screenshots)
  game: Game;
}
