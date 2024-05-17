
export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
export interface User extends Document {
  id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_card: number;
  user_role: UserRole;
  user_isactive: boolean;
  user_last_login_date: Date;
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
  size: number;
}

export default UploadedFileInter;
