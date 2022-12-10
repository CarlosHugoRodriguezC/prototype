import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  parent?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
