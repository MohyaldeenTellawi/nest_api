import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreatUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { v4 as uuid } from 'uuid';
import { UserResponseDto } from './dtos/user.response.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserServices {
  private users: UserEntity[] = [];
  findAllUser(): UserEntity[] {
    return this.users;
  }
  findUser(id: string): UserResponseDto {
    const user = this.users.find((user: UserEntity) => user.id === id);
    // for example
    if (!user) {
      throw new NotFoundException('Not Found User');
    }
    return new UserResponseDto(user);
  }
  async createUser(createUserDto: CreatUserDto): Promise<UserResponseDto> {
    const newUSer: UserEntity = {
      ...createUserDto,
      password: await bcrypt.genSalt(),
      id: uuid(),
    };
    this.users.push(newUSer);
    return new UserResponseDto(newUSer);
  }
  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const index = this.users.findIndex((user: UserEntity) => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }
  deleteUser(id: string): string {
    this.users = this.users.filter((user: UserEntity) => user.id !== id);
    return `this ${id} deleted`;
  }
}
