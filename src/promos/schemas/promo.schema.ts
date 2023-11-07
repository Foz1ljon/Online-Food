import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class Promo {
  @ApiProperty({
    example: "TEZ&$D#",
    description: "PROMO name",
    uniqueItems: true,
    required: true,
  })
  @Prop({ unique: true })
  name: string;

  @ApiProperty({
    example: "Yozgi chegirmalar",
    description: "PROMO description",
    required: true,
  })
  @Prop()
  description: string;
  @Prop()
  @ApiProperty({
    example: "30",
    description: "PROMO discount",
    required: true,
  })
  discount: string;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);
