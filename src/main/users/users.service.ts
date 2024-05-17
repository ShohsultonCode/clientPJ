import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(Users)
    // private usersRepository: Repository<Users>,
  ) {}

}
