import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Food } from "./schemas/food.schema";
import { Category } from "../category/schemas/category.schema";
import { Restaurant } from "../restaurants/schemas/restaurant.schema";
import { FilesService } from "../files/files.service";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<Food>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    private readonly fileService: FilesService,
  ) {}

  async create(createFoodDto: CreateFoodDto, image: any) {
    if (!image) throw new BadRequestException("Photo is required");
    const photoName = await this.fileService.createFile(image);

    const { category, restaurant } = createFoodDto;
    if (!isValidObjectId(category) || !isValidObjectId(restaurant))
      throw new BadRequestException("Invalid Category or Restaurant id");
    const category1 = await this.categoryModel.findById(category);
    const restaurant1 = await this.restaurantModel.findById(restaurant);
    if (!category1 || !restaurant1)
      throw new NotFoundException("Category or restaurant not found");

    const data = await this.foodModel.create({
      ...createFoodDto,
      photo: photoName,
    });

    return (await data.populate("category")).populate("restaurant");
  }

  findAll() {
    return this.foodModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.foodModel.findById(id);
    if (!result) throw new NotFoundException("Not found");
    return (await result.populate("category")).populate("restaurant");
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.foodModel.findById(id);
    if (!result) throw new NotFoundException("Not found");
    if (updateFoodDto.category) {
      if (!isValidObjectId(updateFoodDto.category))
        throw new BadRequestException("Invalid id");
      const result = await this.categoryModel.findById(updateFoodDto.category);
      if (!result) throw new NotFoundException("Category not found");
    }
    if (updateFoodDto.restaurant) {
      if (!isValidObjectId(updateFoodDto.restaurant))
        throw new BadRequestException("Invalid id");
      const result = await this.restaurantModel.findById(
        updateFoodDto.category,
      );
      if (!result) throw new NotFoundException("Restaurant not found");
    }

    return this.foodModel
      .findByIdAndUpdate(id, updateFoodDto)
      .populate("category")
      .populate("restaurant");
  }
  async updatePhoto(id: string, image: any) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.foodModel.findById(id);

    if (!result) throw new NotFoundException("Not found");

    if (!image) throw new BadRequestException("Photo is required");
    await this.fileService.deleteFile(result.photo);
    const photoName = await this.fileService.createFile(image);

    return this.foodModel.findByIdAndUpdate(id, { photo: photoName });
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.foodModel.findById(id);
    if (!result) throw new NotFoundException("Not found");
    return this.foodModel.findByIdAndDelete(id);
  }
}
