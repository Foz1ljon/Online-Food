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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin-auth.guard";

@ApiTags("Categories")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Add a new category" })
  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "Get all categories" })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: "Get category by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }
  @ApiOperation({ summary: "Update category by id" })
  @Patch(":id")
  @UseGuards(AdminGuard)
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Delete category by id" })
  @Delete(":id")
  @UseGuards(AdminGuard)
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
