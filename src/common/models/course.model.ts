// src/users/schemas/user.schema.ts

import * as mongoose from 'mongoose';


export const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true, unique:true },
  course_description: { type: String, required: true},
  course_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  course_image: { type: String, required: true},
  course_banner: { type: String, required: true},
  course_price: { type: String, required: true},
  course_isactive:{type:Boolean, default:true},
});
