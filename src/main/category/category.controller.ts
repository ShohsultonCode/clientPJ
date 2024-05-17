import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UploadedFileInter from 'src/common/entity/user.entity';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post("create")
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  async create(@Body() createCategoryDto: CreateCategoryDto,  @UploadedFile() file: UploadedFileInter, @Req() req: any):Promise<Object> {        
    return this.categoryService.createCategory(createCategoryDto, file, req);
  }

  @Get('all')
  async findAll():Promise<Object> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Object> {
    return this.categoryService.findOne(id);
  }


  @Put('update')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  async update(@Body() updateCategoryDto: UpdateCategoryDto,  @UploadedFile() file: UploadedFileInter):Promise<Object> {
    return this.categoryService.update(updateCategoryDto, file);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string):Promise<Object> {   
    return this.categoryService.remove(id);
  }
}
