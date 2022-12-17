import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { contentParser } from 'fastify-multer';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(contentParser);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://crislabs.vercel.app'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
