import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionResponseFilter } from './src/common/filters/http-exception-response-filter';
import { TrimPipe } from './src/common/pipes/trim.pipe';
import { AppModule } from './src/app.module';

/**
 * Configure the IoC container for the NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 */
function setupContainer(app: INestApplication): void {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

/**
 * Set up the global exception filter for the NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 */
function setupExceptionFilter(app: INestApplication): void {
  app.useGlobalFilters(new HttpExceptionResponseFilter());
}

/**
 * Add cookie-parser middleware to the NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 */
function setupCookieParser(app: INestApplication): void {
  app.use(cookieParser());
}

/**
 * Set up global pipes for data transformation and validation in the NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 */
function setupGlobalPipes(app: INestApplication): void {
  app.useGlobalPipes(
    // Custom pipe to automatically trim whitespace from incoming request data.
    new TrimPipe(),

    // Validation pipe to automatically validate incoming request payloads.
    new ValidationPipe({
      // Enable automatic transformation of incoming payload data to matching dto.
      transform: true,

      // Continue validating all properties, even if some validations fail.
      stopAtFirstError: false,

      // Custom exception stripe to handle validation errors and throw BadRequestException.
      exceptionFactory: (errors) => {
        // Transform each validation error into a custom error object.
        const customErrors = errors.map((e) => {
          const firstError = JSON.stringify(e.constraints);
          return { field: e.property, message: firstError };
        });

        // Throw a BadRequestException with the custom error object.
        throw new BadRequestException(customErrors);
      },
    }),
  );
}

// /**
//  * Set global prefix for all routes in the NestJS application.
//  *
//  * @param app The INestApplication instance of the NestJS application.
//  */
// function setGlobalPrefix(app: INestApplication): void {
//   app.setGlobalPrefix('api');
// }

/**
 * Set up Swagger documentation for the NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 */
function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      description: 'Enter JWT Bearer token only',
    })
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
      description: 'Login with username and password',
    })
    .setTitle('IT-Incubator API')
    .setDescription(
      'API for IT-Incubator project. This API provides endpoints for managing users, posts, and comments.',)
    .setVersion('36.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}

/**
 * Function to configure and set up a NestJS application.
 *
 * @param app The INestApplication instance of the NestJS application.
 * @returns The same INestApplication instance after applying configurations.
 */
export const createApp = (app: INestApplication): INestApplication => {
  setupContainer(app);
  setupExceptionFilter(app);
  setupCookieParser(app);
  setupGlobalPipes(app);
  // setGlobalPrefix(app);
  setupSwagger(app);
  return app;
};
