import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdatePromoDto {
  @ApiProperty({
    example: "TEZ&$D#",
    description: "PROMO name",
    uniqueItems: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty({
    example: "Yozgi chegirmalar",
    description: "PROMO description",
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "30",
    description: "PROMO discount",
  })
  @IsOptional()
  @IsNumberString()
  discount: string;
}
