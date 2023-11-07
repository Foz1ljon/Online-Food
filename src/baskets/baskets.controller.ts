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
import { BasketsService } from "./baskets.service";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { CookieGetter } from "../common/decorators/cookieGetter.decorator";
import { UserGuard } from "../common/guards/user-auth.guard";
import { AddFoodBasketDto } from "./dto/addFood-basket.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Basket")
@Controller("baskets")
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}
  @ApiOperation({ summary: "Add Basket" })
  @Post()
  @UseGuards(UserGuard)
  create(
    @Body() createBasketDto: CreateBasketDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.create(createBasketDto, refreshToken);
  }

  @ApiOperation({ summary: "Add food in basket" })
  @Post("add/food")
  @UseGuards(UserGuard)
  addFood(
    @Body() FoodBasket: AddFoodBasketDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.addFood(FoodBasket, refreshToken);
  }

  @ApiOperation({ summary: "remove food in basket" })
  @Delete("remove/food")
  @UseGuards(UserGuard)
  removeFood(
    @Body() food: AddFoodBasketDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.removeFood(food, refreshToken);
  }

  @ApiOperation({ summary: "Get all Basket" })
  @Get()
  @UseGuards(UserGuard)
  findAll(@CookieGetter("refresh_token") refreshToken: string) {
    return this.basketsService.findAll(refreshToken);
  }

  @ApiOperation({ summary: "GEt Basket by Id" })
  @Get(":id")
  @UseGuards(UserGuard)
  findOne(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.findOne(id, refreshToken);
  }

  @ApiOperation({ summary: "Update Basket by Id" })
  @Patch(":id")
  @UseGuards(UserGuard)
  update(
    @Param("id") id: string,
    @Body() updateBasketDto: UpdateBasketDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.update(id, updateBasketDto, refreshToken);
  }

  @ApiOperation({ summary: "Remove Basket by Id" })
  @Delete(":id")
  @UseGuards(UserGuard)
  remove(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.basketsService.remove(id, refreshToken);
  }
}
