import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('logins')
export class ExistTradeLogin {
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

  @ManyToOne(() => User, (user) => user.logins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
