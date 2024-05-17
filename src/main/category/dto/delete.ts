import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()   
  @ApiProperty({
    example:"you have to send category_id"
  })  
  category_id: string;
}
