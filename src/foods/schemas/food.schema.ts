import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class Food {
  @ApiProperty({ example: "food.jpg", description: "food photo" })
  @Prop()
  photo: string;

  @ApiProperty({ example: "Lavash", description: "food name" })
  @Prop()
  name: string;

  @ApiProperty({ example: "Achchiq kichkina", description: "food about" })
  @Prop()
  description: string;

  @ApiProperty({ example: "40000", description: "food price" })
  @Prop()
  price: string;

  @ApiProperty({ example: "903mve", description: " category id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: string;

  @ApiProperty({ example: "restaurantcd", description: " restaurant id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" })
  restaurant: string;

  @ApiProperty({ example: "true", description: " food status" })
  @Prop({ default: true })
  status: boolean;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
