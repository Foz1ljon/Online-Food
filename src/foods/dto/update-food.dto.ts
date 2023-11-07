import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateFoodDto {
  @ApiProperty({ example: "Lavash", description: "food name" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ example: "Achchiq kichkina", description: "food about" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ example: "40000", description: "food price" })
  @IsOptional()
  @IsNumberString()
  price?: number;

  @ApiProperty({ example: "903mve", description: " category id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;

  @ApiProperty({ example: "restaurantcd", description: " restaurant id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  restaurant?: string;
}
