import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddFoodBasketDto {
  @ApiProperty({ example: "43fsfsfsfcs23", description: "basket id" })
  @IsNotEmpty()
  @IsString()
  basket: string;

  @ApiProperty({ example: "43fsfsfsfcs23", description: "food id" })
  @IsNotEmpty()
  @IsString()
  food: string;
  
}
