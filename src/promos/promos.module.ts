import { Module } from "@nestjs/common";
import { PromosService } from "./promos.service";
import { PromosController } from "./promos.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Promo, PromoSchema } from "./schemas/promo.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Promo.name, schema: PromoSchema }]),
    JwtModule,
  ],
  controllers: [PromosController],
  providers: [PromosService],
})
export class PromosModule {}
