import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Rayxon", description: "Restaurant name" })
  @IsNotEmpty()
  @IsString()
  name: string;
  /*  ________________ */

  @ApiProperty({
    example: "+998923456789",
    description: "Restaurant phone_number",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  /*  ________________ */

  @ApiProperty({ example: "Rayxon@mail.uz", description: "Restaurant email" })
  @IsEmail()
  email: string;
}
