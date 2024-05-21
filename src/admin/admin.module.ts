import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { Schemas } from 'src/config/constant';
import { AdminCategoryService } from './admin.category.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
 imports:[
  MongooseModule.forFeature(Schemas),
  JwtModule.registerAsync({
    imports: [ConfigModule],  
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'), 
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRATION'), 
      },
    }),
    inject: [ConfigService],  
  }),
 ],
 controllers: [AdminController],
 providers: [AdminService, AdminCategoryService, AdminGuard], 
})
export class AdminModule {}
