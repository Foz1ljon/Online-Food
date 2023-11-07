import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "process";
import { AdminModule } from "./admin/admin.module";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { RegionModule } from "./region/region.module";
import { TerritoryModule } from "./territory/territory.module";
import { CategoryModule } from "./category/category.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { FoodsModule } from "./foods/foods.module";
import { PromosModule } from "./promos/promos.module";
import { UserlocationModule } from "./userlocation/userlocation.module";
import { BasketsModule } from "./baskets/baskets.module";
import { OrderbyModule } from "./orderby/orderby.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(env.MONGODB_URI),

    AdminModule,
    UsersModule,
    FilesModule,
    RegionModule,
    TerritoryModule,
    CategoryModule,
    RestaurantsModule,
    FoodsModule,
    PromosModule,
    UserlocationModule,
    BasketsModule,
    OrderbyModule,
  ],
})
export class AppModule {}
