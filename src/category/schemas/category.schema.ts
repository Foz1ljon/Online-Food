import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class Category {
  @ApiProperty({ example: "ICHIMLIKLAR", description: "Category name" })
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
