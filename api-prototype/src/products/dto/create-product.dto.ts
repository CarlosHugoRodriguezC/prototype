import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  lifeStyle: string;

  @IsString()
  SKU: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  status?: string;
}
