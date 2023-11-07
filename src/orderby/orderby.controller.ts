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
import { OrderbyService } from "./orderby.service";
import { CreateOrderbyDto } from "./dto/create-orderby.dto";
import { UpdateOrderbyDto } from "./dto/update-orderby.dto";
import { CookieGetter } from "../common/decorators/cookieGetter.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";
import { ChangeStatusDto } from "./dto/changeStatus.dot";
import { UserGuard } from "../common/guards/user-auth.guard";
@ApiTags("OrderBy")
@Controller("profile/orderby")
export class OrderbyController {
  constructor(private readonly orderbyService: OrderbyService) {}
  @ApiOperation({ summary: "Add Order" })
  @Post()
  @UseGuards(UserGuard)
  create(
    @Body() createOrderbyDto: CreateOrderbyDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.orderbyService.create(createOrderbyDto, refreshToken);
  }
  @ApiOperation({ summary: "change status order" })
  @Patch("change")
  @UseGuards(AdminGuard)
  change(@Body() change: ChangeStatusDto) {
    return this.orderbyService.changeState(change);
  }

  @ApiOperation({ summary: "Get all Order" })
  @Get()
  @UseGuards(UserGuard)
  findAll(@CookieGetter("refresh_token") refreshToken: string) {
    return this.orderbyService.findAll(refreshToken);
  }

  @ApiOperation({ summary: "Get Order by id" })
  @Get(":id")
  @UseGuards(UserGuard)
  findOne(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.orderbyService.findOne(id, refreshToken);
  }

  @ApiOperation({ summary: "Update Order by id" })
  @Patch(":id")
  @UseGuards(UserGuard)
  update(
    @Param("id") id: string,
    @Body() updateOrderbyDto: UpdateOrderbyDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.orderbyService.update(id, updateOrderbyDto, refreshToken);
  }

  @ApiOperation({ summary: "Delete Order by id" })
  @Delete(":id")
  @UseGuards(UserGuard)
  remove(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.orderbyService.remove(id, refreshToken);
  }
}
