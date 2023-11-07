import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserlocationDto {
  @ApiProperty({ example: "Gozal dahasi", description: "Location name" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
  @ApiProperty({
    example: "Gozal dahasi 33/22",
    description: "Location description",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;
  @ApiProperty({ example: "22", description: "Location lattitude" })
  @IsOptional()
  @IsNumber()
  lattitude?: number;
  @ApiProperty({ example: "22", description: "Location longitude" })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
