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
import { UserlocationService } from "./userlocation.service";
import { CreateUserlocationDto } from "./dto/create-userlocation.dto";
import { UpdateUserlocationDto } from "./dto/update-userlocation.dto";
import { CookieGetter } from "../common/decorators/cookieGetter.decorator";
import { ApiTags } from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user-auth.guard";
@ApiTags("User-Location")
@Controller("profile/location")
export class UserlocationController {
  constructor(private readonly userlocationService: UserlocationService) {}
  @Post()
  @UseGuards(UserGuard)
  create(
    @Body() Userlocation: CreateUserlocationDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.userlocationService.create(Userlocation, refreshToken);
  }
  @Get()
  @UseGuards(UserGuard)
  findAll(@CookieGetter("refresh_token") refreshToken: string) {
    return this.userlocationService.findAll(refreshToken);
  }
  @Get(":id")
  @UseGuards(UserGuard)
  findOne(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.userlocationService.findOne(id, refreshToken);
  }
  @Patch(":id")
  @UseGuards(UserGuard)
  update(
    @Param("id") id: string,
    @Body() updateUserlocationDto: UpdateUserlocationDto,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.userlocationService.update(
      id,
      updateUserlocationDto,
      refreshToken,
    );
  }
  @Delete(":id")
  @UseGuards(UserGuard)
  remove(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
  ) {
    return this.userlocationService.remove(id, refreshToken);
  }
}
