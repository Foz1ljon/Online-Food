import { Module } from "@nestjs/common";
import { OrderbyService } from "./orderby.service";
import { OrderbyController } from "./orderby.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Orderby, OrderbySchema } from "./schemas/orderby.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { Basket, BasketSchema } from "../baskets/schemas/basket.schema";
import { JwtModule } from "@nestjs/jwt";
import { Promo, PromoSchema } from "../promos/schemas/promo.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orderby.name, schema: OrderbySchema },
      { name: User.name, schema: UserSchema },
      { name: Basket.name, schema: BasketSchema },
      { name: Promo.name, schema: PromoSchema },
    ]),
    JwtModule,
  ],
  controllers: [OrderbyController],
  providers: [OrderbyService],
})
export class OrderbyModule {}
