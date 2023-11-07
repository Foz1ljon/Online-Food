import { ApiProperty } from "@nestjs/swagger";

export class LoginAdminDto {
  @ApiProperty({
    example: "SobirovJobir@example.uz",
    description: "Admin email",
  })
  email: string;
  @ApiProperty({ example: "Sob!r0v", description: "Admin password" })
  password: string;
}
