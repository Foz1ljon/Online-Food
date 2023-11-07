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
  Put,
  UseGuards,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddLocationDto } from "./dto/add-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";
import { UserGuard } from "../common/guards/user-auth.guard";
@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @ApiOperation({ summary: "Add Restaurant" })
  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() image: any,
  ) {
    return this.restaurantsService.create(createRestaurantDto, image);
  }

  @ApiOperation({ summary: "Get all Restaurant" })
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @ApiOperation({ summary: "Get Restaurant by id" })
  @Get(":id")
  @UseGuards(UserGuard)
  findOne(@Param("id") id: string) {
    return this.restaurantsService.findOne(id);
  }

  @ApiOperation({ summary: "Update Restaurant by id" })
  @UseGuards(AdminGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }
  @ApiOperation({ summary: "Update Restaurant photo by id" })
  @UseGuards(AdminGuard)
  @Put("photo/:id")
  @UseInterceptors(FileInterceptor("image"))
  updatePhoto(@Param("id") id: string, @UploadedFile() image: any) {
    return this.restaurantsService.updateRestaurantPhoto(id, image);
  }

  @ApiOperation({ summary: "Delete Restaurant by id" })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.restaurantsService.remove(id);
  }

  @ApiOperation({ summary: "Add  location  Restaurant by id" })
  @UseGuards(AdminGuard)
  @Post("location/:id")
  addLocation(@Param("id") id: string, @Body() addLocationDto: AddLocationDto) {
    return this.restaurantsService.addLocation(id, addLocationDto);
  }

  @ApiOperation({ summary: "Update location by id" })
  @UseGuards(AdminGuard)
  @Put("location/:id")
  updateLocation(@Param("id") id: string, @Body() update: UpdateLocationDto) {
    return this.restaurantsService.editLocation(id, update);
  }
  @ApiOperation({ summary: "Get all locations Restaurant by id" })
  @UseGuards(UserGuard)
  @Get(":id/locations")
  getLocations(@Param("id") id: string) {
    return this.restaurantsService.findallLocation(id);
  }
  @ApiOperation({ summary: "Get location by id" })
  @UseGuards(UserGuard)
  @Get("location/:id")
  getById(@Param("id") id: string) {
    return this.restaurantsService.findById(id);
  }

  @ApiOperation({ summary: "Remove location by id" })
  @UseGuards(AdminGuard)
  @Delete("location/:id")
  delLocation(@Param("id") id: string) {
    return this.restaurantsService.removeLocation(id);
  }
}
