import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    example:"Pizza"
  })  
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({
    example:"your image"
  })  
  @IsNotEmpty()
  @IsOptional()
  category_image: any;

  @IsOptional()   
  @ApiProperty({
    example:"true or fale, it is optional"
  })  
  category_isactive: boolean;
}
