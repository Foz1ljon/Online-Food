import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { TerritoryService } from "./territory.service";
import { AddTerritoryDto } from "./dto/add-territory.dto";
import { UpdateTerritoryDto } from "./dto/update-territory.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";
@ApiTags("Territories")
@Controller("territory")
export class TerritoryController {
  constructor(private readonly territoryService: TerritoryService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Add a new territory" })
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() addTerritoryDto: AddTerritoryDto) {
    return this.territoryService.create(addTerritoryDto);
  }

  @ApiOperation({ summary: "Get all territories" })
  @Get()
  findAll() {
    return this.territoryService.findAll();
  }

  @ApiOperation({ summary: "Get a territory by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.territoryService.findOne(id);
  }

  @ApiOperation({ summary: "Update a territory by id" })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTerritoryDto: UpdateTerritoryDto,
  ) {
    return this.territoryService.update(id, updateTerritoryDto);
  }

  @ApiOperation({ summary: "Delete a territory by id" })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.territoryService.remove(id);
  }
}
