import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentation in Swagger - Users API')
    .setDescription(
      'Creates a Swagger configuration for the Users API.The Swagger configuration is used to generate documentation for the API endpoints.',
    )
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
