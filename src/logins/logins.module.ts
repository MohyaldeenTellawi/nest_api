import { Module } from '@nestjs/common';
import { LoginService } from './logins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './login.entity';
import { LoginController } from './login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
