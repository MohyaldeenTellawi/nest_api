import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreatUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import { UserServices } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly userServices:UserServices){}

  @Get()
    findAllUsers(): UserEntity [] {
        return this.userServices.findAllUser();
    }
    @Get(":id")
    findUser(@Param("id", ParseUUIDPipe)id:string) {
        return this.userServices.findUser(id);
    }
    
    @Post()
    creatNewUser(@Body()creatUserDto:CreatUserDto) {
       return this.userServices.createUser(creatUserDto);
    }
  
    @Patch(":id")
    updateUser(@Param("id", ParseUUIDPipe)id:string, @Body()updateUserDto:UpdateUserDto){
        return this.userServices.updateUser(id,updateUserDto);
    }
   @Delete(":id")
   removeUser(@Param("id", ParseUUIDPipe)id:string){
  return this.userServices.deleteUser(id);
   }
}