import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageService } from '../image/image.service';

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
  controllers: [ProductController],
  providers: [ProductService, ImageService],
})
export class ProductModule {}
