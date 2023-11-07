import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Basket } from "./schemas/basket.schema";
import { Model, isValidObjectId } from "mongoose";
import { Food } from "../foods/schemas/food.schema";
import { User } from "../users/schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { Userlocation } from "../userlocation/schemas/userlocation.schema";
import { AddFoodBasketDto } from "./dto/addFood-basket.dto";

@Injectable()
export class BasketsService {
  constructor(
    @InjectModel(Basket.name) private basketModel: Model<Basket>,
    @InjectModel(Food.name) private foodModel: Model<Food>,
    @InjectModel(Userlocation.name) private userLocModel: Model<Userlocation>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createBasketDto: CreateBasketDto, refreshToken: string) {
    const { location } = createBasketDto;
    const uid = this.jwtService.decode(refreshToken)["id"];
    if (!isValidObjectId(location)) throw new BadRequestException("Invalid id");

    const findLoc = await this.userLocModel.findOne({
      _id: location,
      user: uid,
    });

    if (!findLoc) throw new NotFoundException("Location not found");
    return this.basketModel.create({
      ...createBasketDto,
      user: uid,
    });
  }

  async addFood(addFood: AddFoodBasketDto, refreshToken: string) {
    const { basket, food } = addFood;

    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(basket) || !isValidObjectId(food))
      throw new BadRequestException("Invalid id");
    const findBasket = await this.basketModel.findOne({
      _id: basket,
      user: uid,
    });
    const findFood = await this.foodModel.findById(food);
    if (!findBasket) throw new NotFoundException("Basket not found");
    if (!findFood) throw new NotFoundException("Food not found");
    findBasket.foods.push(findFood);
    await findBasket.save();
    return findBasket;
  }
  async removeFood(addFood: AddFoodBasketDto, refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(addFood.basket) || !isValidObjectId(addFood.food)) {
      throw new BadRequestException("Invalid id");
    }

    const findBasket = await this.basketModel.findOne({
      _id: addFood.basket,
      user: uid,
    });

    if (!findBasket) {
      throw new NotFoundException("Basket not found");
    }

    const findFood = await this.foodModel.findById(addFood.food);

    if (!findFood) {
      throw new NotFoundException("Food not found");
    }
    const updatedBasket = await this.basketModel.findOneAndUpdate(
      { _id: addFood.basket },
      { $pull: { foods: addFood.food } },
      { new: true },
    );
    return updatedBasket;
  }

  findAll(refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    return this.basketModel
      .find({ user: uid })
      .populate("location")
      .populate("foods");
  }

  async findOne(id: string, refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.basketModel.findOne({ _id: id, user: uid });
    if (!data) throw new NotFoundException("Basket Not found");
    return data;
  }

  async update(
    id: string,
    updateBasketDto: UpdateBasketDto,
    refreshToken: string,
  ) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");

    if (updateBasketDto.location) {
      if (!isValidObjectId(updateBasketDto.location))
        throw new BadRequestException("Invalid location id");
      const location = await this.userLocModel.findOne({ _id: id, user: uid });
      if (!location) throw new NotFoundException("Location Not found");
    }

    const data = await this.basketModel.findOne({ _id: id, user: uid });
    if (!data) throw new NotFoundException("Basket Not found");
    return this.basketModel.findByIdAndUpdate(id, updateBasketDto);
  }

  async remove(id: string, refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.basketModel.findOne({ _id: id, user: uid });
    if (!data) throw new NotFoundException("Basket Not found");

    return this.basketModel.findByIdAndDelete(id);
  }
}
