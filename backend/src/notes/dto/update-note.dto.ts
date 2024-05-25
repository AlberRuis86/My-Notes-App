import { IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsArray()
  readonly tags?: string[];

  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
