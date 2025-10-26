import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateMessageDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: "Content cannot be empty" })
  @ApiProperty({ 
    required: false, 
    example: "Salam", 
    description: "Mesaj mətni" 
  })
  content?: string;

  @IsOptional()
  @Transform(({ value }) => value || undefined)
  @IsUUID("4", { message: "Media must be a valid UUID" })
  @ApiProperty({
    required: false,
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Media faylının ID-si",
  })
  media?: string;
}