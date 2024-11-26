import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' }) // For Swagger. Optional.
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee.' }) // For Swagger. Optional.
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] }) // For Swagger. Optional.
  // Since this property is an array, the annotation will make sure that
  // "each" of its elements is a string.
  @IsString({ each: true })
  readonly flavors: string[];
}
