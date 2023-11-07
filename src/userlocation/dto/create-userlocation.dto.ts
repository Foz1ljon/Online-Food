import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserlocationDto {
  @ApiProperty({ example: "Gozal dahasi", description: "Location name" })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    example: "Gozal dahasi 33/22",
    description: "Location description",
  })
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty({ example: "22", description: "Location lattitude" })
  @IsNumber()
  lattitude: number;
  @ApiProperty({ example: "22", description: "Location longitude" })
  @IsNumber()
  longitude: number;
}
