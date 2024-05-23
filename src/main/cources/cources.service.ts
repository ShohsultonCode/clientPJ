import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-cource.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { UtilsService } from 'src/admin/utilies.service';
import { Category, Course, Section } from 'src/common/entity/user.entity';

@Injectable()
export class CourcesService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
    @InjectModel('Courses') private readonly Courses: Model<Course>,
    @InjectModel('Sections') private readonly Sections: Model<Section>,
    private readonly imageService: ImageService,
    private readonly utilsService: UtilsService,
  ) { }


  async create(body: CreateCourseDto): Promise<Object> {
    const { course_name, course_category, course_description, course_video, course_duration, course_price, course_learns, course_isactive } = body;

    const checkCategory = await this.utilsService.findCategory(course_category);
                                                                
    if (!checkCategory) {
      throw new BadRequestException('This Category name is already created, Please change name!');
    }

    const courseTemplate = await this.Courses.create({
      course_name: course_name.trim(),
      course_description: course_description.trim(),
      course_category: course_category,
      course_duration: course_duration,
      course_learns: course_learns,
      course_price: course_price,
      course_video: course_video.trim(),
      course_isactive: course_isactive,
    });

    await courseTemplate.save();  
    
    return { message: 'Success', statusCode:200};
  }

  findAll() {
    return `This action returns all cources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cource`;
  }

  update(id: number, updateCourceDto: any) {
    return `This action updates a #${id} cource`;
  }

  remove(id: number) {
    return `This action removes a #${id} cource`;
  }
}
