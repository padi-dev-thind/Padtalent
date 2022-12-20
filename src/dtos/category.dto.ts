import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DeleteCategoryDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
