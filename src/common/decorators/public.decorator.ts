import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';

// SetMetadata itself is a decorator and we could use it directly like this
// @SetMetadata('isPublic', true)
// But, that could cause code repetetion and the use of magic strings
// are not recommended. So, we're creating our own decorator based on
// SetMetadata, which is @Public.
// Go to coffees.controller.ts to see its usage.
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
