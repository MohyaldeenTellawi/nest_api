import { IsEmail, IsString, Length } from 'class-validator';

export class CreatUserDto {
  @IsString()
  @Length(3, 20)
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  country: string;
  @IsString()
  password: string;
}
