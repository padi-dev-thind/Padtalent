import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @Expose()
  @IsString()
  @IsOptional()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  country_id: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  num_of_followers: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  num_of_followings: number;

  @Expose()
  @IsOptional()
  @IsString()
  profile_img: string;

  @Expose()
  @IsOptional()
  @IsString()
  banner_img: string;

  @Expose()
  @IsOptional()
  @IsString()
  facebook_url: string;

  @Expose()
  @IsOptional()
  @IsString()
  instagram_url: string;

  @Expose()
  @IsOptional()
  @IsString()
  youtube_url: string;

  @Expose()
  @IsOptional()
  @IsString()
  twitter_url: string;

  @Expose()
  @IsString()
  language: string;
}
