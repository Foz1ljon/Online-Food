import { Module } from "@nestjs/common";
import { RegionService } from "./region.service";
import { RegionController } from "./region.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Region, RegionSchema } from "./schemas/region.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
    JwtModule,
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
