import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { loginWithEmailDto } from './dto/loginwithEmaildto';
import { registerDto } from './dto/register.dto';
import { updateProfileDto } from './dto/update.profile.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: registerDto): Promise<Object> {
    return this.authService.registerWithEmail(body);
  }


  @Post('login')
  async login(@Body() body: loginWithEmailDto): Promise<Object> {
    return this.authService.loginWithEmail(body);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard) 
  async update(@Body() body: updateProfileDto, @Req() req: any): Promise<Object> {
    return this.authService.updateProfile(body, req);
  }


  @Post('register/google')
  async registerWithGoogle(@Body() body: string): Promise<Object> {
    return this.authService.loginWithGoogle(body);
  }
}
