import { Type } from 'class-transformer';
import { IsOptional, IsPositive, isPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // Anything passed for this property will be automatically parsed to number.
  // We don't need it in this project because we've set implicit convertion to "true"
  // in the global validator settings in main.ts file.
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
