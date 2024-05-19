import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginWithEmailDto } from '../auth/dto/loginwithEmaildto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard) 
  async login(@Req() req: any): Promise<Object> {
    return this.usersService.getProfile(req);
  }
}
