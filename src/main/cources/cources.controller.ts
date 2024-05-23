import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CreateCourseDto } from './dto/create-cource.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { UpdateCourseDto } from './dto/update.category.dto';


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

  @Get("all")
  @ApiResponse({ status: 200, description: 'All cources' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findAll():Promise<Object> { 
    return this.courcesService.findAll();
  }


  @ApiResponse({ status: 200, description: 'Find cource' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Object> {
    return this.courcesService.findOne(id);
  }
 

  @Put('update')
  async update(@Body() updateCourceDto: UpdateCourseDto):Promise<Object> {    
    return this.courcesService.update(updateCourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<Object> {
    return this.courcesService.remove(id);
  }
}
