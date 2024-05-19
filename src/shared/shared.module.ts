import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from 'src/admin/admin.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/main/auth/auth.module';
import { ImageModule } from 'src/main/image/image.module';
import { UsersModule } from 'src/main/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    AdminModule,
    UsersModule,
    AuthModule,
    ImageModule,
  ],
  providers: [],
  controllers: []
})
export class SharedModule {}
