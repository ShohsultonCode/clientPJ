import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';



@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createSectionDto: CreateSectionDto):Promise<Object> {
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionsService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(+id);
  }
}
