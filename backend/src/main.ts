import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Exponer la carpeta public/ para servir estáticamente las fotos subidas en /uploads/
  app.useStaticAssets(join(process.cwd(), 'public'));

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
