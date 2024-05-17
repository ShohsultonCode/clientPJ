// src/users/schemas/user.schema.ts

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_image: { type: String, required: true},
  product_price:{type:Number, required:true},
  product_category: { type: Schema.Types.ObjectId, ref: 'Categories' }, // Reference to Category
  product_description: { type: String, required: true},
  product_isactive: { type: Boolean, required: true, default:false},
  product_isdiscount: { type: Boolean, required: true, default:false},
});

