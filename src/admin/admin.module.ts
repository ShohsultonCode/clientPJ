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
    imports: [ConfigModule], // Import ConfigModule for using ConfigService
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'), // Retrieve JWT secret from configuration
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRATION'), // Retrieve expiration from configuration
      },
    }),
    inject: [ConfigService],  
  }),
 ],
 controllers: [AdminController],
 providers: [AdminService, AdminCategoryService, AdminGuard], // Don't forget to include your guard in the providers array
})
export class AdminModule {}
