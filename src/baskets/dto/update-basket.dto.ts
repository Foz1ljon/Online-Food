import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBasketDto {
  @ApiProperty({ example: "43fsfsfsfcs23", description: "location id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;
}
