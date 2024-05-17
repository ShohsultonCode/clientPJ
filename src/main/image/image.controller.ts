import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}


  @Get(":filename")
  async getImages(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }
}
