import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/common';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';


///Module is creating 
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION')}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard, JwtAuthGuard],
})
export class AuthModule {}
