import { Module } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { RestaurantsController } from "./restaurants.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Restaurant, RestaurantSchema } from "./schemas/restaurant.schema";
import { Location, LocationSchema } from "./schemas/location.schema";
import { FilesModule } from "../files/files.module";
import {
  Territory,
  TerritorySchema,
} from "../territory/schemas/territory.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Territory.name, schema: TerritorySchema },
    ]),
    FilesModule,
    JwtModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
