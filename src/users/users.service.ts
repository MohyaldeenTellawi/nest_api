import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { CreatUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import {v4 as uuid } from "uuid";

@Injectable()
export class UserServices{
    private users:UserEntity[]=[];
    findAllUser():UserEntity[]{
        return this.users;
    }
    findUser(id:string):UserEntity{
        return this.users.find((user:UserEntity)=>user.id===id);
    }
    createUser(createUserDto:CreatUserDto):UserEntity{
        const newUSer:UserEntity = {
            ...createUserDto,
            id:uuid(),
        };
        this.users.push(newUSer);
        return newUSer;
    }
    updateUser(id:string,updateUserDto:UpdateUserDto):UserEntity{
        const index = this.users.findIndex((user:UserEntity)=>user.id===id);
        this.users[index] = {...this.users[index], ...updateUserDto};
        return this.users[index];
    }
    deleteUser(id:string):string{
        this.users = this.users.filter((user:UserEntity)=>user.id !== id);
        return `this ${id} deleted`;
    }
}