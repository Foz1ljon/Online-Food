import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { SuperAdminGuard } from "../common/guards/super-admin.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags("Admins")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // @UseGuards(SuperAdminGuard)
  @ApiOperation({ summary: "signup admin" })
  @Post("signup")
  register(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.add(registerAdminDto);
  }
  @ApiOperation({ summary: "login admin" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @ApiOperation({ summary: "Get all Admin" })
  @Get()
  @UseGuards(SuperAdminGuard)
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Get admin by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: "Update admin by id" })
  @Patch(":id")
  @UseGuards(SuperAdminGuard)
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: "Remove admin by id" })
  @Delete(":id")
  @UseGuards(SuperAdminGuard)
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
