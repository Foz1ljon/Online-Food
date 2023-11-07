import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CookieGetter } from "../common/decorators/cookieGetter.decorator";
import { UserGuard } from "../common/guards/user-auth.guard";
import { User } from "./schemas/user.schema";
import { AdminGuard } from "../common/guards/admin-auth.guard";
@ApiTags("Users")
@Controller("")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  /* Register  */
  @ApiOperation({ summary: "Register a new user" })
  @Post("auth/signup")
  register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return this.usersService.signup(registerUserDto, res);
    } catch (error) {
      this.logger.error("error", error.stack, UsersController.name);
    }
  }

  /* Login  */
  @ApiOperation({ summary: "Login a user" })
  @HttpCode(HttpStatus.OK)
  @Post("auth/signin")
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      return this.usersService.signin(loginUserDto, res);
    } catch (error) {
      this.logger.error("error", error.stack, UsersController.name);
    }
  }
  
  /* User  activate  */
  @ApiOperation({ summary: "Activate a new user" })
  @Get("profile/activate/:link")
  activate(@Param("link") link: string) {
    try {
      return this.usersService.activate(link);
    } catch (error) {
      this.logger.error("error", error.stack, UsersController.name);
    }
  }

  /* Refresh token */
  @UseGuards(UserGuard)
  @Post("profile/refresh")
  refresh(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(refreshToken, res);
  }

  /* Logout User */
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "logout customer" })
  @ApiResponse({ status: 200, type: User })
  // @UseGuards(CustomerGuard)
  @HttpCode(HttpStatus.OK)
  @Post("profile/logout")
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  /* Get all user */
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Get all users" })
  @Get("users")
  findAll() {
    return this.usersService.findAll();
  }

  /* Get by id User */
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Get a user by id" })
  @Get("profile:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  /* Update Image */

  @ApiOperation({ summary: "Update photo user by id" })
  // @UseGuards(UserGuard)
  @Patch("profile/photo")
  @UseInterceptors(FileInterceptor("image"))
  updatePhoto(
    @CookieGetter("refresh_token") refreshToken: string,
    @UploadedFile() image: any,
  ) {
    return this.usersService.updatePhoto(refreshToken, image);
  }

  /* Update userData fname and lname */

  @ApiOperation({ summary: "Update a user by id" })
  @Patch("profile/update")
  update(
    @CookieGetter("refresh_token") refreshToken: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(refreshToken, updateUserDto);
  }

  /* Delete account */
  @ApiOperation({ summary: "Remove a user by id" })
  @UseGuards(UserGuard)
  @Delete("profile/remove")
  remove(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.remove(refreshToken, res);
  }
}
