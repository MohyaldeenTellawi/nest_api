import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExistTradeLogin } from './exist-login.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dtos/exist-login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(ExistTradeLogin)
    private loginRepo: Repository<ExistTradeLogin>,
  ) {}

  async findAllLogins(): Promise<ExistTradeLogin[]> {
    return this.loginRepo.find();
  }

  async findLogin(id: number): Promise<ExistTradeLogin> {
    const tradeLogin = await this.loginRepo.findOneBy({ id });
    if (!tradeLogin) {
      throw new NotFoundException('Not Found User');
    }
    return tradeLogin;
  }
  async createLogin(createLoginDto: CreateLoginDto): Promise<ExistTradeLogin> {
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
