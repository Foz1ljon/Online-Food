import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "Jobir", description: "user firstname" })
  @IsOptional()
  @IsString()
  fname?: string;

  @ApiProperty({ example: "Sobirov", description: "user lastname" })
  @IsOptional()
  @IsString()
  lname?: string;

  @ApiProperty({ example: "+998911234567", description: "user phone_number" })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone_number?: string;

  @ApiProperty({ example: "S0b!rov", description: "user password" })
  @IsOptional()
  @IsStrongPassword({ minLength: 6 })
  password?: string;
}
