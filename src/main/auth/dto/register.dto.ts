import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//LoginWithGoogleDto
export class registerDto {
  @ApiProperty({
    example:"John Doe"
  })  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  user_name: string;

  @IsEmail() // Ensures the field contains a valid email address
  @ApiProperty({
    example:"Jo@gmail.com"
  })  
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255) // This is a common maximum length for email fields
  user_email: string;

  @IsString()
  @ApiProperty({
    example:"123326125"
  })  
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  user_password: string;
}
