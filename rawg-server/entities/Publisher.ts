import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity("publishers")
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "varchar", nullable: true })
  image_background?: string | null;

  @ManyToMany(() => Game, (game) => game.publishers)
  games: Game[];
}
