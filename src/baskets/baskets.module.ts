import { Module } from "@nestjs/common";
import { BasketsService } from "./baskets.service";
import { BasketsController } from "./baskets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Basket, BasketSchema } from "./schemas/basket.schema";
import { Food, FoodSchema } from "../foods/schemas/food.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import {
  Userlocation,
  UserlocationSchema,
} from "../userlocation/schemas/userlocation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Basket.name, schema: BasketSchema },
      { name: Food.name, schema: FoodSchema },
      { name: Userlocation.name, schema: UserlocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
  ],
  controllers: [BasketsController],
  providers: [BasketsService],
})
export class BasketsModule {}
