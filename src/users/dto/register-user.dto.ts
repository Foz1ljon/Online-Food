import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: "Jobir", description: "user firstname" })
  @IsString()
  fname: string;

  @ApiProperty({ example: "Sobirov", description: "user lastname" })
  @IsString()
  lname: string;

  @ApiProperty({ example: "Sobirov400@mail.ru", description: "user email" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998911234567", description: "user phone_number" })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "S0b!rov", description: "user password" })
  @IsStrongPassword({ minLength: 6 })
  password: string;
  @ApiProperty({ example: "Link", description: "user activate_link" })
  active_link: string;
}
