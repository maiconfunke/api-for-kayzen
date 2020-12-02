import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  src: string;

  @ManyToOne(type => User, user => user.photo)
  user: User
}
