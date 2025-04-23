import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  // Инициализация сервера на основе fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'PATCH'],
      },
    },
  );

  // Объявление глобальной валидации на сервере

  app.useGlobalPipes(new ValidationPipe());

  // Прослушивание сервера на 4000 порту
  await app.listen(4000);
}
bootstrap();
