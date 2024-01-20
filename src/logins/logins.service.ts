import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './login.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dtos/create-login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class LoginService {
  constructor(@InjectRepository(Login) private loginRepo: Repository<Login>) {}

  async findAllLogins(): Promise<Login[]> {
    return this.loginRepo.find();
  }

  async findLogin(id: number): Promise<Login> {
    const tradeLogin = await this.loginRepo.findOneBy({ id });
    if (!tradeLogin) {
      throw new NotFoundException('Not Found User');
    }
    return tradeLogin;
  }
  async createLogin(createLoginDto: CreateLoginDto): Promise<Login> {
    const hasedPass = await bcrypt.hash(createLoginDto.tradePassword, 10);
    const hasedPassLogin = {
      ...createLoginDto,
      tradePassword: hasedPass,
    };
    const newTradeLogin = await this.loginRepo.save(hasedPassLogin);
    return newTradeLogin;
  }

  async deleteLogin(id: number): Promise<void> {
    await this.loginRepo.delete({ id });
  }
}
