import { Module } from '@nestjs/common';
import { LoginService } from './logins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExistTradeLogin } from './exist-login.entity';
import { LoginController } from './exist-login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExistTradeLogin])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
