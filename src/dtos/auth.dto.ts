import { Expose } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CandidateLoginDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
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
