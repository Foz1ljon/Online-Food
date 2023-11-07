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
import { PromosService } from "./promos.service";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { UpdatePromoDto } from "./dto/update-promo.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";
@ApiTags("Promo-Codes")
@Controller("promo")
export class PromosController {
  constructor(private readonly promosService: PromosService) {}
  @ApiOperation({ summary: "Add Promo" })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPromoDto: CreatePromoDto) {
    return this.promosService.create(createPromoDto);
  }
  @ApiOperation({ summary: "Get all Promo" })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.promosService.findAll();
  }

  @ApiOperation({ summary: "Get Promo by name" })
  @UseGuards(AdminGuard)
  @Get(":name")
  findOne(@Param("name") name: string) {
    return this.promosService.findOne(name);
  }
  @ApiOperation({ summary: "Update Promo by id" })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promosService.update(id, updatePromoDto);
  }

  @ApiOperation({ summary: "Delete Promo by id" })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.promosService.remove(id);
  }
}
