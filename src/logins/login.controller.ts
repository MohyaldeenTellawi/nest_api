import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './logins.service';
import { Login } from './login.entity';
import { Puplic } from 'src/common/decoretors/roles.decorator';
import { CreateLoginDto } from './dtos/create-login.dto';
import { CustomExceptionFilter } from 'src/common/filters/custom-exception/custom-exception.filter';
@UseFilters(CustomExceptionFilter)
@UsePipes(ValidationPipe)
@Controller('logins')
export class LoginController {
  constructor(private readonly loginServices: LoginService) {}

  @Puplic()
  @Get()
  async findAllUsers(): Promise<Login[]> {
    return await this.loginServices.findAllLogins();
  }
  @Puplic()
  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<Login> {
    return await this.loginServices.findLogin(id);
  }

  @Post()
  async creatNewUser(@Body() createLoginDto: CreateLoginDto): Promise<Login> {
    return await this.loginServices.createLogin(createLoginDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeLogin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.loginServices.deleteLogin(id);
  }
}
