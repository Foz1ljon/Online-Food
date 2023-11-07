import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class Territory {
  @ApiProperty({ example: "NAMANGAN", description: "territory name" })
  @Prop()
  name: string;

  @ApiProperty({ example: "3498mva4fpfsf", description: "region id" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  region: string;
}

export const TerritorySchema = SchemaFactory.createForClass(Territory);
