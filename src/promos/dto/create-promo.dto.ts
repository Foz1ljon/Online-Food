import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from "class-validator";

export class CreatePromoDto {
  @ApiProperty({
    example: "TEZ&$D#",
    description: "PROMO name",
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty({
    example: "Yozgi chegirmalar",
    description: "PROMO description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "30",
    description: "PROMO discount",
    required: true,
  })
  @IsNumberString()
  discount: string;
}
