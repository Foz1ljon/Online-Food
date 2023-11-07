import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterAdminDto {
  @ApiProperty({ example: "Sobirov Jobir", description: "Admin fullname" })
  @IsString()
  fullname: string;

  @ApiProperty({
    example: "SobirovJobir@example.uz",
    description: "Admin email",
  })
  @IsEmail()
  email: string;
  @ApiProperty({ example: "+998912345678", description: "Admin phone number" })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "Sob!r0v", description: "Admin password" })
  @IsStrongPassword({ minLength: 5 })
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  key?: string;
}
