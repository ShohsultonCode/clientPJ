import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
