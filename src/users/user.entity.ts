import { Login } from 'src/logins/login.entity';
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

  @OneToMany(() => Login, (login) => login.user, { cascade: true })
  logins?: Login[];
}
