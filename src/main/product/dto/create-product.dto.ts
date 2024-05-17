import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Example Name',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  product_name: string;


  @ApiProperty({
   example: 'Example Name',
   description: 'The Price of the product, you can send me as string or number it does not matter',
 })
 @IsString()
 @IsNotEmpty()
 @MinLength(1)
 @MaxLength(50)
 product_price: string;


 @ApiProperty({
  example: 'Product',
  description: 'The category id of product',
})
@IsString()
@IsNotEmpty()
@MinLength(1)
@MaxLength(50)
product_category: string;


  @ApiProperty({
   example: 'Example Name',
   description: 'The Description of the product',
 })
 @IsString()
 @IsNotEmpty()
 @MinLength(5)
 @MaxLength(40)
 product_description: string;


  @ApiProperty({
    example: 'your_image.jpg or png',
    description: 'The image of the product',
  })
  product_image: string;

  @IsString()
  @ApiProperty({
    example: true,
    description: 'Whether the product is active or not (optional)',
    required: false,
  })
  @IsOptional()
  product_isactive?: boolean;

  @IsString()
  @ApiProperty({
   example: true,
   description: 'Whether the product is discount or not (optional)',
   required: false,
 })
 @IsOptional()
 @IsBoolean()
 product_discount?: boolean;
}
