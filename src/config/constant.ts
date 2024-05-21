import { UserSchema } from "src/common";
import { categorySchema } from "src/common/models/category.model";

export const CLOUDINARY = 'Cloudinary';

export const Schemas = [
  { name: 'Users', schema: UserSchema},
  { name: 'Categories', schema: categorySchema},
]
