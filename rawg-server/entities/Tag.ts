import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Game } from "./Game";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  language: string;

  @Column({ type: "varchar", nullable: true })
  image_background?: string | null;

  @ManyToMany(() => Game, (game) => game.tags)
  games: Game[];
}
