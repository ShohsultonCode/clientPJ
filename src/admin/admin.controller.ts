import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminCategoryService } from './admin.category.service';
import { AdminService } from './admin.service';
import { CreateCategoryDto } from './dto/category/category.create.dto';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import UploadedFileInter from 'src/common/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('admin-side')
@Controller('admin-side')
export class AdminController {
  constructor(
   private readonly adminService: AdminService,
   private readonly adminCategoryService: AdminCategoryService
   ) {}




  @Post("create/category")
  // @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @UseInterceptors(fileUploadInterceptor('category_image'))
  async createCategory(@Body() body: CreateCategoryDto,  @Req() req: any,  @UploadedFile() file: UploadedFileInter):Promise<Object> {
    return this.adminCategoryService.createCategory(req, body, file);
  }
 

  // @ApiProperty({})
  // @Get("categories")
  // @UseGuards(AdminGuard)
  // async findAll():Promise<Object> {   
  //   return await this.adminCategoryService.findAllCategories();
  // }

  @Get(':id')
 async findOne(@Param('id') id: string):Promise<any> {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: any) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
