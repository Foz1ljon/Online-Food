import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeStatusDto {
  @ApiProperty({ example: "3q0m qfsv", description: "User id" })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: "3q0m qfsv", description: "order id" })
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({
    example: "[waiting cancel success]",
    description: "Order status",
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
