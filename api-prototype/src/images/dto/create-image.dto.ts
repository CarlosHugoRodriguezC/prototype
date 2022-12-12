import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  url: string;
}
