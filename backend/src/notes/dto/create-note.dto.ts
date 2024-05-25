import { IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsArray()
  readonly tags: string[];

  @IsOptional()
  @IsBoolean()
  readonly archived?: boolean;
}
