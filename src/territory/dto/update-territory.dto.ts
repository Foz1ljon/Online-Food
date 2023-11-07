import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUppercase } from "class-validator";

export class UpdateTerritoryDto {
  @ApiProperty({ example: "NAMANGAN", description: "territory name" })
  @IsOptional()
  @IsNotEmpty()
  @IsUppercase()
  name?: string;

  @ApiProperty({ example: "3498mva4fpfsf", description: "region id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  region?: string;
}
