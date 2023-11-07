import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: "sobirov707@gmail.com", description: "User email" })
  email: string;

  @ApiProperty({ example: "S0b!rov", description: "User password" })
  password: string;
}
