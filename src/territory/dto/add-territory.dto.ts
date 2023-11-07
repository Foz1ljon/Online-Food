import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUppercase } from "class-validator";

export class AddTerritoryDto {
  @ApiProperty({ example: "NAMANGAN", description: "territory name" })
  @IsNotEmpty()
  @IsUppercase()
  name: string;

  @ApiProperty({ example: "3498mva4fpfsf", description: "region id" })
  @IsNotEmpty()
  @IsString()
  region: string;
}
