import { Expose } from 'class-transformer';
import {
  Allow,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';
import { AllowNull } from 'sequelize-typescript';
import GameType from '@enum/game.enum';

export class TestDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  game_type_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  candidate_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  assessment_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  result: number;

  @Expose()
  start_date: Date;

  @Expose()
  end_date: Date;
}
