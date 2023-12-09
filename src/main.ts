import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://192.168.100.5:3001'
  })
  
  await app.listen(3003);
}
bootstrap();
