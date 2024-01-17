import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserServices } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UserServices],
})
export class UsersModule {}
