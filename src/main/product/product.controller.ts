import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { ApiTags } from '@nestjs/swagger';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import UploadedFileInter from 'src/common/entity/user.entity';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}



  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('product_image'))
  async create(@Body() createProductDto: CreateProductDto,  @UploadedFile() file: UploadedFileInter, @Req() req: any):Promise<Object> {
    return this.productService.create(createProductDto, file, req);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async findAll():Promise<Object> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
