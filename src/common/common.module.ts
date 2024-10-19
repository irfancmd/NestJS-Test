import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

// Our ApiKeyGuard requires dependency injection via constructor, so it had to be inside a NestJS
// module isntead of simply being a standalone typescript file. 
@Module({
    imports: [ConfigModule],
    providers: [{
        // We want to evaluate NestJS default APP_GUARD 'constant' to our custom guard.
        // Anything that the 'APP_GUARD' symbol points to, will be used as the global route
        // guard by NestJS. Since we're using explicit provider declaration like this, we don't
        // have to put it in useGlobalGuard() function in main.ts file.
        provide: APP_GUARD, useClass: ApiKeyGuard
    }] 
})
// To setup a middleware, we have to implement the NestModule inteface which provides
// a configure method which takes a MiddlewareConsumer object.
export class CommonModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // We want our middleware to be applicable for all routes.
        consumer.apply(LoggingMiddleware).forRoutes('*');    

        // We can also chain .excludes() method with apply() for excluding certain paths.
        // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');    

        // Apply the middleware for paths that contain 'coffees' and is a get method.
        // consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET });    
    }
}
 