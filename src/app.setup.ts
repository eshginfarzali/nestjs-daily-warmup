import { INestApplication, ValidationPipe } from '@nestjs/common';

/** Global settings shared by main.ts and the e2e tests. */
export function configureApp(app: INestApplication): INestApplication {
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties without decorators
      forbidNonWhitelisted: true, // ...and reject requests that send them
      transform: true, // payloads become DTO instances
    }),
  );
  return app;
}
