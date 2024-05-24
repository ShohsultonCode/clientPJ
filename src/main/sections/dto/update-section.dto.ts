import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSectionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Id of course ',
    description: 'Id of course',
  })
  @MinLength(3)
  @MaxLength(100)
  cc_course_id: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Introduction to JavaScript',
    description: 'Title of the course section',
  })
  @MinLength(3)
  @MaxLength(100)
  cc_title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This section covers the basics of JavaScript.',
    description: 'Description of the course section',
  })
  @MinLength(10)
  @MaxLength(1000)
  cc_description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'http://example.com/intro-video.mp4',
    description: 'URL of the course section video',
  })
  @MaxLength(2048)
  cc_video: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-01-01',
    description: 'Date of the course section',
  })
  cc_date: string;
}
