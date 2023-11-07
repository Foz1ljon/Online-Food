import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateRestaurantDto {
  @ApiProperty({ example: "Rayxon", description: "Restaurant name" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
  /*  ________________ */

  @ApiProperty({
    example: "+998923456789",
    description: "Restaurant phone_number",
  })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;
  /*  ________________ */

  @ApiProperty({ example: "res.jpg", description: "Restaurant photo" })
  @IsOptional()
  photo?: string;
  /*  ________________ */

  @ApiProperty({ example: "Rayxon@mail.uz", description: "Restaurant email" })
  @IsOptional()
  @IsEmail()
  email?: string;
}
