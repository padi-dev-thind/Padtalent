import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { AllowNull } from 'sequelize-typescript';

export class AsssessmentDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  game_types: string;

  @Expose()
  @AllowNull
  start_date: Date;

  @Expose()
  @AllowNull
  end_date: Date;
}

