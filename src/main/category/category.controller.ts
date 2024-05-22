import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import UploadedFileInter from 'src/common/entity/user.entity';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.create.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post("create")
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  async createCategory(@Body() body: CreateCategoryDto, @Req() req: any, @UploadedFile() file: UploadedFileInter): Promise<Object> {
    return this.categoryService.createCategory(req, body, file);
  }


  @Get("all")
  @UseGuards(AdminGuard)
  async findAll(): Promise<Object> {
    return await this.categoryService.findAllCategories();
    // all categories
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string): Promise<Object> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto, @Req() req: any, @UploadedFile() file: UploadedFileInter) {
    return this.categoryService.update(body, req, file);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string): Promise<Object> {
    return this.categoryService.remove(id);
  }
}
