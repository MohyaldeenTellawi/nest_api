import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreatUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CustomI18nService } from 'src/common/shared/custom-i18n.service';
@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly i18n: CustomI18nService,
  ) {}

  async findAllUser(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      // throw new NotFoundException('Not Found User');
      throw new NotFoundException(this.i18n.translate('test.NOT_FOUND'));
    }
    return user;
  }
  async createUser(createUserDto: CreatUserDto): Promise<User> {
    const hasedPass = await bcrypt.hash(createUserDto.password, 10);
    const hasedPassUser = {
      ...createUserDto,
      password: hasedPass,
    };
    const newUser = await this.userRepo.save(hasedPassUser);
    return newUser;
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findUser(id);
    const hasedPass = await bcrypt.hash(userToUpdate.password, 10);
    if (!userToUpdate) {
      throw new NotFoundException('Not Found User');
    }
    const updatedUSer = {
      ...userToUpdate,
      ...updateUserDto,
      password: hasedPass,
    };
    return await this.userRepo.save(updatedUSer);
  }
  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete({ id });
  }
}
