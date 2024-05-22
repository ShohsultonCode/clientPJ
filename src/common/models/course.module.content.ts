import * as mongoose from 'mongoose';

export const CourseModuleSchema = new mongoose.Schema({
  cm_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true, unique: true },
  cm_title:{type:String, required:true},
  cm_content_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'CourseContents', required: true, unique: true}]
});
  