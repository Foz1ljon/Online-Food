import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class User {
  @ApiProperty({ example: "Jobir", description: "user firstname" })
  @Prop()
  fname: string;

  @ApiProperty({ example: "Sobirov", description: "user lastname" })
  @Prop()
  lname: string;

  @ApiProperty({ example: "default.jpg", description: "user photo" })
  @Prop()
  photo: string;

  @ApiProperty({ example: "Sobirov400@mail.ru", description: "user email" })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({ example: "+998911234567", description: "user phone_number" })
  @Prop({ unique: true })
  phone_number: string;

  @ApiProperty({ example: "S0b!rov", description: "user password" })
  @Prop()
  password: string;

  @ApiProperty({ example: "Link", description: "user activate_link" })
  @Prop()
  activation_link: string;

  @ApiProperty({ example: "true", description: "user activate" })
  @Prop({ default: false })
  is_active: boolean;

  @ApiProperty({ example: "vlfjffq54grds", description: "user refresh_token" })
  @Prop()
  hashed_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
