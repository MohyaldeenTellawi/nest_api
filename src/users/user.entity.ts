import { ExistTradeLogin } from 'src/trade-login/exist-login.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  country: string;

  @OneToMany(() => ExistTradeLogin, (login) => login.user)
  logins?: ExistTradeLogin[];
}
