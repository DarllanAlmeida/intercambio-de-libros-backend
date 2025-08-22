import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir CORS desde tu frontend
  app.enableCors({
    origin: ['http://localhost:3003'], // aquí va el origen de React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // si usas cookies o sesiones
  });

  await app.listen(3001);
}
bootstrap();