// src/users/schemas/user.schema.ts
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  user_first_name: { type: String, required: true },
  user_last_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_wallet: { type: Number, required: true,  default:50000},
  user_role: { type: String, required: true, default:"user"},
});
