import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminCategoryService {
 constructor(
  // @InjectModel('Categories') private readonly Categories: Model<Category>,
 ){}
 create(createAdminDto: any) {
    return 'This action adds a new admin';
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
