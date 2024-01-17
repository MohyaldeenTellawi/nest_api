import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UserServices } from './users.service';
import { CustomExceptionFilter } from 'src/common/filters/custom-exception/custom-exception.filter';
import { Puplic } from 'src/common/decoretors/roles.decorator';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  DATABASE_HOST: string;
  EMAIL: string;
}

@UseFilters(CustomExceptionFilter)
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userServices: UserServices,
    private readonly configServic: ConfigService<EnvironmentVariables>,
  ) {
    console.log(this.configServic.get('DATABASE_HOST', { infer: true }));
  }

  @Puplic()
  @Get()
  findAllUsers(): UserEntity[] {
    return this.userServices.findAllUser();
  }
  @Puplic()
  @Get(':id')
  findUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServices.findUser(id);
  }

  @Post()
  creatNewUser(@Body() creatUserDto: CreatUserDto) {
    return this.userServices.createUser(creatUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userServices.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userServices.deleteUser(id);
  }
}
