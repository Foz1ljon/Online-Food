import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateOrderbyDto {
  @ApiProperty({ example: "9594gs ggd", description: "basket id" })
  @IsNotEmpty()
  @IsString()
  basket: string;
  @ApiProperty({ example: "[cash card]", description: "payment type" })
  @IsNotEmpty()
  @IsString()
  payment_type: string;
  @ApiProperty({ example: "9RFW3", description: "promocode" })
  @IsOptional()
  @IsNotEmpty()
  @IsAlphanumeric()
  promo: string;
}
