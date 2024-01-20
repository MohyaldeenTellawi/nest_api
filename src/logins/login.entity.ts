import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logins')
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tradeLogin: number;

  @Column()
  tradePassword: string;

  @Column()
  server: string;

  @ManyToOne(() => User, (user) => user.logins)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
