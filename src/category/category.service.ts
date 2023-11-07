import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schemas/category.schema";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (category) throw new BadRequestException("Category already exists");
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found category");
    return data;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found category");
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found category");
    return this.categoryModel.findByIdAndDelete(id);
  }
}
