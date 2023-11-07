import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from "class-validator";

export class CreateFoodDto {
  @ApiProperty({ example: "Lavash", description: "food name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Achchiq kichkina", description: "food about" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "40000", description: "food price" })
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({ example: "903mve", description: " category id" })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: "restaurantcd", description: " restaurant id" })
  @IsNotEmpty()
  @IsString()
  restaurant: string;
}
