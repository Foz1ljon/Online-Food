import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLocationDto {
  @ApiProperty({ example: "Toshkent Bunyodkor", description: "Location name" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
  /*  ________________ */

  @ApiProperty({
    example: "Toshkent Bunyodkor 44-uy",
    description: "Location address",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  /*  ________________ */
  @ApiProperty({ example: "44", description: "Location lattitude" })
  @IsOptional()
  @IsNumber()
  lattitude?: number;

  /*  ________________ */
  @ApiProperty({ example: "44", description: "longitude lattitude" })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  /*  ________________ */
  @ApiProperty({ example: "5q9mc9-few", description: "territory id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  territory?: string;
}
