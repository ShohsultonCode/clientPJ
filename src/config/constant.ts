import { UserSchema } from "src/common";
import { categorySchema } from "src/common/models/category.model";
import { ProductSchema } from "src/common/models/prodcut.model";

export const CLOUDINARY = 'Cloudinary';

export const Schemas = [
  { name: 'Users', schema: UserSchema},
  { name: 'Products', schema: ProductSchema},
  { name: 'Categories', schema: categorySchema},
]
