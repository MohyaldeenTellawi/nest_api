import { IsNumber, IsString, Matches } from 'class-validator';

export class CreateLoginDto {
  @IsNumber()
  tradeLogin: number;
  @IsString()
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one CAPITAL letter.',
  })
  readonly tradePassword: string;

  @IsString()
  server: string;
}
