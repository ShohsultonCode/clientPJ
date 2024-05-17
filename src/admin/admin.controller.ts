import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCategoryService } from './admin.category.service';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';


@ApiTags('admin')
@Controller('admin-side')
export class AdminController {
  constructor(
   private readonly adminService: AdminService,
   private readonly adminCategoryService: AdminCategoryService
   ) {}

  @Post()
  create(@Body() createAdminDto: any) {
    return this.adminService.create(createAdminDto);
  }
 

  @ApiProperty({})
  @Get("categories")
  @UseGuards(AdminGuard)
  async findAll():Promise<Object> {   
    return await this.adminCategoryService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
