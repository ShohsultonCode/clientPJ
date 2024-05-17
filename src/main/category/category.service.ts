import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UploadedFileInter, { User } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { ImageService } from '../image/image.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Users') private readonly Users: Model<User>, // Inject User model provider
        @InjectModel('Categories') private readonly Categories: Model<Category>, // Inject User model provider
        private readonly imageService: ImageService, // Inject ImageService
    ) { }

    //create category
    async createCategory(
        body: CreateCategoryDto,
        file: UploadedFileInter,
        req: any,
    ): Promise<Object> {
        const { category_name, category_isactive } = body;

        const categoryCheck = await this.Categories.findOne({
            category_name: category_name.trim().toLowerCase(),
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
            category_isactive: category_isactive,
            category_image: file.filename
        };

        const newCategory = await this.Categories.create(categoryTemplate);

        const category = await this.Categories.findById(newCategory.id)

        return { message: 'Success Create', statusCode: 200, data: category };
    }

    async findAll(): Promise<Object> {
        const categories = await this.Categories.find({
            category_isactive: true
        }).exec();
        return { message: "Succes", statusCode: 200, data: categories }
    }


    async findOne(id: string): Promise<Object> {
        await checkId(id)
        const category = await this.Categories.findOne({
            id: id,
            category_isactive: true
        });

        if (!category) {
            throw new BadRequestException(`Category with ID ${id} not found`);
        }
        return { message: "Success", statusCode: 200, data: category };
    }


    async update(body: UpdateCategoryDto, file: UploadedFileInter): Promise<Object> {
      const { category_name, category_isactive, category_id } = body;

      // Check if the category exists
      const findCategory = await this.Categories.findById(category_id);
      if (!findCategory) {
          throw new NotFoundException("Category not found");
      }
  
      // If there's a file, update the category image
      if (file && file.filename) {
          const imageNameToDelete = findCategory.category_image;
          // Assuming `deleteImage` is a Promise that deletes the image
          const deleteImage = await this.imageService.deleteImage(imageNameToDelete);
          findCategory.category_image = file.filename;
          await findCategory.save();
      }
  
      // Check if the category name already exists
      const checkNameOfCategory = await this.Categories.findOne({
          category_name: category_name.trim().toLowerCase()
      });
      if (checkNameOfCategory && checkNameOfCategory.id != category_id) {
          throw new BadRequestException('This Category name is already created. Please change the name!');
      }
  
      // Prepare the category template for updating
      const categoryTemplate: any = {};
      if (category_name) {
          categoryTemplate.category_name = category_name.trim().toLowerCase();
      }
      if (category_isactive !== undefined) {
          categoryTemplate.category_isactive = category_isactive;
      }
  
      // Update the category
      const updatedCategory = await this.Categories.findByIdAndUpdate(category_id, categoryTemplate, { new: true });
      if (!updatedCategory) {
          throw new NotFoundException("Category not found");
      }
  
      return { message: "Successfully updated", statusCode: 200 };
    }

    async remove(id: string): Promise<Object> {
        await checkId(id);
        const findCategoryImg = await this.Categories.findById(id)

        if (findCategoryImg && findCategoryImg.category_image) {
            const deleteImage = await this.imageService.deleteImage(findCategoryImg.category_image)
            const deleteCategory = await this.Categories.findByIdAndDelete(id);
            return { message: "Success", statusCode: 200 };
        }
        throw new NotFoundException("Category not found")
    }
}
