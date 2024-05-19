import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { UserSchema } from 'src/common';
import { User } from 'src/common/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Users: Model<User>, 
  ) {}


  async getProfile(req: any): Promise<Object> {
    try { 
      const user = await this.Users.findById(req.user.id);
      if (!user) {
        throw new NotFoundException('User not found !');
      }
      return { message: 'Success', statusCode: 200, data: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
