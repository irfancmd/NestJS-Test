import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  // The reflector class of NestJS allows us to access relevant metadata of the handler (method) or class.
  // Custom metadata can be set by @SetMetadata or its derivates like @Public, which we creaated.
  constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // If we wanted to get class level metadata, we would use context.getClass().
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // If isPublic metadata is present and true, skip authorization check
    if(isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>(); // The Request interface of express

    const authHeader = request.header('Authorization');

    // return authHeader === process.env.API_KEY;

    return authHeader === this.configService.get('API_KEY'); // Better way of accessing config
  }
}
