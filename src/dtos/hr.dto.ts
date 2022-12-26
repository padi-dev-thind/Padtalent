import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { AllowNull } from 'sequelize-typescript';
import GameType from '@enum/game.enum';

export class HrDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Expose()
  @IsString()
  logo: string;

  @Expose()
  @IsString()
  role: string;

  @Expose()
  @IsString()
  company: string;

  @Expose()
  @IsString()
  company_industry: string;

  @Expose()
  @IsString()
  company_size: string;

  @Expose()
  @IsString()
  is_admin: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  logical: boolean;

  @Expose()
  memory: boolean;
}
