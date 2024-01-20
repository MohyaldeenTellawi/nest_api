import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserServices } from './users.service';
import { CustomExceptionFilter } from 'src/common/filters/custom-exception/custom-exception.filter';
import { Puplic } from 'src/common/decoretors/roles.decorator';

@UseFilters(CustomExceptionFilter)
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UserServices) {}

  @Puplic()
  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userServices.findAllUser();
  }
  @Puplic()
  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userServices.findUser(id);
  }

  @Post()
  async creatNewUser(@Body() creatUserDto: CreatUserDto): Promise<User> {
    return await this.userServices.createUser(creatUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userServices.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userServices.deleteUser(id);
  }
}
