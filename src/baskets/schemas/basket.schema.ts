import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Food } from "../../foods/schemas/food.schema";
import mongoose from "mongoose";
@Schema({ versionKey: false })
export class Basket {
  @ApiProperty({ example: "[Foods]", description: "food id" })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }] })
  foods: Food[];
  @ApiProperty({ example: "43fs23csf", description: "user id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
  @ApiProperty({ example: "43fsfsfsfcs23", description: "location id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Userlocation" })
  location: string;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
