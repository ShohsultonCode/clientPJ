import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 7002;

  // Global filters and pipes
  // app.useGlobalFilters(new MyExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api');   

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Pizza API')
    .setDescription('Pizza API Description')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs-pizza-locks', app, document);

  // Logger setup
    const logger = new Logger();
    app.useLogger(logger);

  await app.listen(port);
  console.log(port);
}

bootstrap();



