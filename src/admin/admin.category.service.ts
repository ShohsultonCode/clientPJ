import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UploadedFileInter, { Category } from 'src/common/entity/user.entity';
import { CreateCategoryDto } from './dto/category/category.create.dto';

@Injectable()
export class AdminCategoryService {
  constructor(
    @InjectModel('Categories') private readonly Categories: Model<Category>,
  ) { }



  async createCategory(req: any, body: CreateCategoryDto, file: UploadedFileInter,): Promise<object> {
    const { category_name, category_image, category_description, category_isactive} = body

    const categoryCheck = await this.Categories.findOne({
      category_name: category_name.trim(),
    });

    if (categoryCheck) {
      throw new BadRequestException(
        'This Category name is already created, Please change name !',
      );
    }

    if (!file || !file.filename) {
      throw new BadRequestException('Please sesnd Catgory Image !');
    }

    const categoryTemplate = {
      category_name: category_name.trim().toLowerCase(),
      category_description: category_name.trim(),
      category_isactive: category_isactive,
      category_image: file.filename
    };

    const newCategory = await this.Categories.create(categoryTemplate);

    const category = await this.Categories.findById(newCategory.id)

    return { message: 'Success', statusCode: 200, data: category };
  }

  //   async findAllCategories():Promise<Object> {   
  //    const viewForAdminCategories = await this.Categories.find().exec()
  //    return {message:"Success", statusCode:200, data:viewForAdminCategories}
  //  }


  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: any) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
