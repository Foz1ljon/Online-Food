import { Module } from "@nestjs/common";
import { TerritoryService } from "./territory.service";
import { TerritoryController } from "./territory.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Territory, TerritorySchema } from "./schemas/territory.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Territory.name, schema: TerritorySchema },
      { name: Region.name, schema: RegionSchema },
    ]),
    JwtModule,
  ],
  controllers: [TerritoryController],
  providers: [TerritoryService],
})
export class TerritoryModule {}
