import { Module } from "@nestjs/common";
import { FoodsService } from "./foods.service";
import { FoodsController } from "./foods.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Food, FoodSchema } from "./schemas/food.schema";
import { Category, CategorySchema } from "../category/schemas/category.schema";
import {
  Restaurant,
  RestaurantSchema,
} from "../restaurants/schemas/restaurant.schema";
import { FilesModule } from "../files/files.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    FilesModule,
    JwtModule,
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
