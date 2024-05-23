import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CreateCourseDto } from './dto/create-cource.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';


@ApiTags('cources')
@Controller('cources')
export class CourcesController {
  constructor(private readonly courcesService: CourcesService) {}

  
  @Post("create")
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() body: CreateCourseDto):Promise<Object> {
    return this.courcesService.create(body);
  }

  @Get()
  findAll() { 
    return this.courcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourceDto: any) {
    return this.courcesService.update(+id, updateCourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courcesService.remove(+id);
  }
}
