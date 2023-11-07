import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Restaurant } from "./restaurant.schema";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class Location {
  @ApiProperty({ example: "Toshkent chilonzor", description: "location name" })
  @Prop()
  name: string;
  /*  ________________ */

  @ApiProperty({
    example: "Toshkent chilonzor 44- uy",
    description: "location address",
  })
  @Prop()
  address: string;
  /*  ________________ */

  @ApiProperty({ example: "44", description: "Location lattitude" })
  @Prop()
  lattitude: number;
  @ApiProperty({ example: "44", description: "longitude lattitude" })
  @Prop()
  longitude: number;
  /*  ________________ */

  @ApiProperty({ example: "5q9mc9-few", description: "territory id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Territory" })
  territory: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
