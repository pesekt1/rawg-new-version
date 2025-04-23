import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;
}
