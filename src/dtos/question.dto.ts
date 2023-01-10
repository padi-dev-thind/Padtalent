import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class LogicalQuestionDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  candidate_answer: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  question_number: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  remaining_time: number;
}

export class MemoryQuestionDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  candidate_answer: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  question_number: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  remaining_time: number;
}
