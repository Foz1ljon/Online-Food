import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class Orderby {
  @ApiProperty({ example: "9594gs ggd", description: "user id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
  @ApiProperty({ example: "9594gs ggd", description: "basket id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Basket" })
  basket: string;
  @ApiProperty({ example: "[cash card]", description: "payment type" })
  @Prop({ default: "cash" })
  payment_type: string;
  @ApiProperty({ example: "9RFW3", description: "promocode" })
  @Prop({ default: null })
  promo: string;
  @ApiProperty({
    example: "[waiting, cancel, success]",
    description: "payment type",
  })
  @Prop({ default: "waiting" })
  status: string;
}

export const OrderbySchema = SchemaFactory.createForClass(Orderby);
