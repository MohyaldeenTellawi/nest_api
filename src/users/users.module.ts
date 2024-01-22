import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserServices } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CustomI18nService } from 'src/common/shared/custom-i18n.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserServices, CustomI18nService],
})
export class UsersModule {}
