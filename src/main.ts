import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new WrapDataInterceptor());
  await app.listen(3000);
}
bootstrap();
