import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;


@Schema({ versionKey: false })
export class Admin {
  @ApiProperty({ example: "Sobirov Jobir", description: "Admin fullname" })
  @Prop()
  fullname: string;

  @ApiProperty({
    example: "SobirovJobir@example.uz",
    description: "Admin email",
  })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({ example: "+998912345678", description: "Admin phone number" })
  @Prop({ unique: true })
  phone_number: string;

  @ApiProperty({ example: "Sob!r0v", description: "Admin password" })
  @Prop()
  password: string;
  @Prop({ default: false })
  is_owner: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
