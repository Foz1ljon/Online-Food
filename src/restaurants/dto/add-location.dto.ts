import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddLocationDto {
  @ApiProperty({ example: "Toshkent Bunyodkor", description: "Location name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  /*  ________________ */
  @ApiProperty({
    example: "Toshkent Bunyodkor 44-uy",
    description: "Location address",
  })
  @IsNotEmpty()
  @IsString()
  address: string;
  /*  ________________ */

  @ApiProperty({ example: "44", description: "Location lattitude" })
  @IsNumber()
  lattitude: number;
  @ApiProperty({ example: "44", description: "longitude lattitude" })
  @IsNumber()
  longitude: number;
  /*  ________________ */

  @ApiProperty({ example: "5q9mc9-few", description: "territory id" })
  @IsNotEmpty()
  @IsString()
  territory: string;
}
