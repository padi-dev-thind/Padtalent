import { Expose } from 'class-transformer';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CandidateLoginDto {
  @Expose()
  @IsNotEmpty()
  email: string;
}

export class RefreshDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
