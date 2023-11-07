import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({versionKey: false})
export class Userlocation {
  @ApiProperty({ example: "Gozal dahasi", description: "Location name" })
  @Prop()
  name: string;
  @Prop()
  @ApiProperty({
    example: "Gozal dahasi 33/22",
    description: "Location description",
  })
  address: string;
  @Prop()
  @ApiProperty({ example: "22", description: "Location lattitude" })
  lattitude: number;
  @ApiProperty({ example: "22", description: "Location longitude" })
  @Prop()
  longitude: number;
  @ApiProperty({ example: "243t32", description: "User id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
}

export const UserlocationSchema = SchemaFactory.createForClass(Userlocation);
