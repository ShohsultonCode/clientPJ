

//user roles
export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
export interface User extends Document {
  id: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_card: number;
  user_role: UserRole;
  user_isactive: boolean;
  user_last_login_date: Date;
}
export interface Category extends Document {
  id: string;
  category_name: string;
  category_description: string;
  category_image: any;
  category_isactive: boolean;
}

interface UploadedFileInter {
  fieldname: string;
  originalname: string;
  name: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number
}

export default UploadedFileInter;
