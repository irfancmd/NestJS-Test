import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/*
 * Just a sample custom decorator that retrieves the request protocol. 
 */
export const Protocol = createParamDecorator(
    (defaultValue: string, ctx: ExecutionContext) =>  {
        const request = ctx.switchToHttp().getRequest();

        return request.protocol || defaultValue;
    }
);