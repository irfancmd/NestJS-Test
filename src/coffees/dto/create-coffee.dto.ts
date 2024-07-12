import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  // Since this property is an array, the annotation will make sure that
  // "each" of its elements is a string.
  @IsString({ each: true })
  readonly flavors: string[];
}
