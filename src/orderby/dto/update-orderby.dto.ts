import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateOrderbyDto {
  @ApiProperty({ example: "9594gs ggd", description: "basket id" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  basket?: string;
  @ApiProperty({ example: "[cash card]", description: "payment type" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  payment_type?: string;
  @ApiProperty({ example: "9RFW3", description: "promocode" })
  @IsOptional()
  @IsNotEmpty()
  @IsAlphanumeric()
  promo: string;
}
