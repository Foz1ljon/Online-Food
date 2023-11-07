import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUppercase } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "ICHIMLIKLAR", description: "Category name" })
  @IsNotEmpty()
  @IsUppercase()
  name: string;
}
