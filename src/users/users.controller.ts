import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreatUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import {v4 as uuid } from "uuid"
import { error } from "console";

@Controller('users')
export class UsersController{

  private   users:UserEntity[] = [];
  @Get()
    findAllUsers(): UserEntity [] {
        return this.users;
    }
    @Get(":id")
    findUser(@Param("id", ParseUUIDPipe)id:string) {
        console.log(typeof id);
        const user: UserEntity =  this.users.find((user)=>user.id===id);
        return user;
    }
    @Post()
    creatNewUser(@Body()creatUserDto:CreatUserDto) {
        const newUser = {
            ...creatUserDto,
          id : uuid(),
        }
        this.users.push(newUser);
        return newUser;
    }
    @Patch(":id")
    updateUser(@Param("id", ParseUUIDPipe)id:string, @Body()updateUserDto:UpdateUserDto){
        // 1 get the element index that we want to update 
        const index = this.users.findIndex((user)=>user.id===id);
        // 2 update the element
        this.users[index] = {...this.users[index], ...updateUserDto};
        return this.users[index];
    }
   @Delete(':id')
   removeUser(@Param("id", ParseUUIDPipe)id:string){
  this.users =   this.users.filter((user)=>user.id !==id);
    return `Delete ${id}`;
   }
}