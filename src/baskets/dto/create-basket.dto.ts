import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBasketDto {
  @ApiProperty({ example: "43fsfsfsfcs23", description: "location id" })
  @IsNotEmpty()
  @IsString()
  location: string;
}
