import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UploadedFileInter, { User } from 'src/common/entity/user.entity';
import { checkId } from 'src/utils/check.id';
import { Category } from '../category/entities/category.entity';
import { ImageService } from '../image/image.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, // Inject User model provider
    @InjectModel('Categories') private readonly Categories: Model<Category>, // Inject User model provider
    @InjectModel('Products') private readonly Products: Model<Product>, // Inject User model provider
    private readonly imageService: ImageService, // Inject ImageService
  ) { }


  async create(createProductDto: CreateProductDto, file: UploadedFileInter, req: any,): Promise<Object> {
    const { product_isactive, product_name, product_description, product_discount, product_price, product_category } = createProductDto

    await checkId(product_category)
    const checkActiveCategory = await this.Categories.findById(product_category)

    if (!checkActiveCategory || checkActiveCategory.category_isactive === false) {
      throw new BadRequestException(
        'This Category is not active, Please active category!',
      );
    }

    const parsedProductPrice: number = typeof product_price === 'string' ? parseFloat(product_price) : product_price;
    if (!file || !file.filename) {
      throw new BadRequestException('Please sesnd Catgory Image !');
    }


    const productTemplate = {
      product_name: product_name.trim(),
      product_description: product_description.trim(),
      product_category: product_category,
      product_isdiscount: product_discount ? product_discount : false,
      product_isactive: product_isactive ? product_isactive : true,
      product_price: parsedProductPrice,
      product_image: file.filename
    }

    const newProduct = await this.Products.create(productTemplate)

    return { message: "Success", statusCode: 200, data: newProduct }
  }

  async findAll(): Promise<Object> {
    const products = await this.Products.find({
      product_isactive: true
    }).populate({
      path: "product_category", 
      match: { category_isactive: true }
    }).exec();
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
