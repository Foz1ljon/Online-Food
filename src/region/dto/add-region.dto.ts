import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUppercase } from "class-validator";

export class AddRegionDto {
  @ApiProperty({ example: "NAMANGAN", description: "Viloyat nomi" })
  @IsNotEmpty()
  @IsUppercase()
  name: string;
}
