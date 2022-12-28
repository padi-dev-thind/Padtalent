import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { AllowNull } from 'sequelize-typescript';
import GameType from '@enum/game.enum';

export class AsssessmentDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  logical: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  memory: boolean;

  @Expose()
  @AllowNull
  start_date: Date;

  @Expose()
  @AllowNull
  end_date: Date;
}

