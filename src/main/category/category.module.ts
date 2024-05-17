import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { ImageService } from '../image/image.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports:[
    MongooseModule.forFeature(Schemas),
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
    })
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ImageService]
})
export class CategoryModule {}
