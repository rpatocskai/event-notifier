import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ CORS Policy konfigurálása
  app.enableCors({
    origin: 'http://localhost:4200', // Csak az Angular frontendünknek engedélyezzük a hozzáférést
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Szükséges, ha később cookie-kat vagy auth headereket küldünk
  });

  await app.listen(3000);
  console.log('Backend is running on: http://localhost:3000');
}
bootstrap();
