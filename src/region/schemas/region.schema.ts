import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class Region {
  @ApiProperty({ example: "NAMANGAN", description: "Viloyat nomi" })
  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
