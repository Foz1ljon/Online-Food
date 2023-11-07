import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { FoodsService } from "./foods.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminGuard } from "../common/guards/admin-auth.guard";
import { UserGuard } from "../common/guards/user-auth.guard";
@ApiTags("Foods")
@Controller("foods")
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}
  @ApiOperation({ summary: "Add food" })
  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createFoodDto: CreateFoodDto, @UploadedFile() image: any) {
    return this.foodsService.create(createFoodDto, image);
  }

  @ApiOperation({ summary: "GEt all food" })
  @Get()
  findAll() {
    return this.foodsService.findAll();
  }
  @ApiOperation({ summary: "Get food by id" })
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.foodsService.findOne(id);
  }

  @ApiOperation({ summary: "Update food by id" })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @ApiOperation({ summary: "Update food photo by id" })
  @UseGuards(AdminGuard)
  @Patch("photo/:id")
  @UseInterceptors(FileInterceptor("image"))
  updatePhoto(@Param("id") id: string, @UploadedFile() image: any) {
    return this.foodsService.updatePhoto(id, image);
  }

  @ApiOperation({ summary: "Remove food by id" })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.foodsService.remove(id);
  }
}
