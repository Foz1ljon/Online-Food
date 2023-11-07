import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RegionService } from "./region.service";
import { AddRegionDto } from "./dto/add-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";

@ApiTags("Regions")
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Add a region" })
  @Post()
  create(@Body() addRegionDto: AddRegionDto) {
    return this.regionService.create(addRegionDto);
  }

  @ApiOperation({ summary: "Get all region" })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: "Get a region by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.regionService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Update a region by id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Delete a region by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.regionService.remove(id);
  }
}
