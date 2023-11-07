import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Location } from "./location.schema";

@Schema({ versionKey: false })
export class Restaurant {
  @ApiProperty({ example: "Rayxon", description: "Restaurant name" })
  @Prop()
  name: string;
  /*  ________________ */

  @ApiProperty({
    example: "+998923456789",
    description: "Restaurant phone_number",
  })
  @ApiProperty({ example: "Rayxon.jpg", description: "Restaurant image" })
  @Prop()
  photo: string;
  /*  ________________ */
  @ApiProperty({ example: "+9980987654", description: "Restaurant phone" })
  @Prop()
  phone: string;
  /*  ________________ */

  @ApiProperty({ example: "Rayxon@mail.uz", description: "Restaurant email" })
  @Prop()
  email: string;
  /*  ________________ */

  @ApiProperty({ example: "[Locations]", description: "Restaurant locations" })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }] })
  locations: Location[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
