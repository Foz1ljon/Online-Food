import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderbyDto } from "./dto/create-orderby.dto";
import { UpdateOrderbyDto } from "./dto/update-orderby.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Orderby } from "./schemas/orderby.schema";
import { Model, isValidObjectId } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Basket } from "../baskets/schemas/basket.schema";
import { JwtService } from "@nestjs/jwt";
import { Promo } from "../promos/schemas/promo.schema";
import { ChangeStatusDto } from "./dto/changeStatus.dot";

@Injectable()
export class OrderbyService {
  constructor(
    @InjectModel(Orderby.name) private orderModel: Model<Orderby>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Basket.name) private basketModel: Model<Basket>,
    @InjectModel(Promo.name) private promoModel: Model<Promo>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createOrderbyDto: CreateOrderbyDto, refreshToken: string) {
    const { basket, promo, payment_type } = createOrderbyDto;
    const id = this.jwtService.decode(refreshToken)["id"];
    let pay = ["cash", "card"];
    if (!isValidObjectId(basket)) throw new BadRequestException("Invalid id");
    const data = await this.basketModel.findOne({ _id: basket, user: id });
    const prom = await this.promoModel.findOne({ name: promo });
    if (!data) throw new NotFoundException("Basket Not found");
    if (!prom) throw new NotFoundException("Promo Not found");
    if (!pay.includes(payment_type))
      throw new BadRequestException("invalid payment type");

    return this.orderModel.create({ ...createOrderbyDto, user: id });
  }

  async findAll(refreshToken: string) {
    const id = this.jwtService.decode(refreshToken)["id"];
    return this.orderModel.find({ user: id });
  }

  async findOne(id: string, refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.orderModel.findOne({ _id: id, user: uid });
    if (!data) throw new NotFoundException("Not found");
    return (await data.populate("basket")).populate("promo");
  }

  async update(
    id: string,
    updateOrder: UpdateOrderbyDto,
    refreshToken: string,
  ) {
    const uid = this.jwtService.decode(refreshToken)["id"];
    let pay = ["cash", "card"];
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");

    const order = await this.orderModel.findOne({ _id: id, user: uid });
    if (!order) throw new NotFoundException("Order not found");

    if (updateOrder.basket) {
      if (!isValidObjectId(updateOrder.basket))
        throw new BadRequestException("Invalid id");
      const data = await this.basketModel.findOne({
        _id: updateOrder.basket,
        user: uid,
      });
      if (!data) throw new NotFoundException("Basket not found");
    }
    if (updateOrder.payment_type) {
      if (!pay.includes(updateOrder.payment_type))
        throw new BadRequestException("Invalid payment type");
    }
    if (updateOrder.promo) {
      const data = await this.promoModel.findOne({ name: updateOrder.promo });
      if (!data) throw new NotFoundException("Promo not found");
    }

    return this.orderModel.findByIdAndUpdate();
  }

  async changeState(change: ChangeStatusDto) {
    let sts = ["cancel", "waiting", "success"];
    if (!isValidObjectId(change.user_id) || !isValidObjectId(change.order_id))
      throw new BadRequestException("Invalid Id");
    const data = await this.orderModel.findOne({
      _id: change.order_id,
      user: change.user_id,
    });

    if (!data) throw new NotFoundException("Order not found");
    if (sts.includes(change.status))
      throw new NotFoundException("Invalid status");
    return this.orderModel.findById(change.order_id, { status: change.status });
  }


  async remove(id: string, refreshToken: string) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.orderModel.findOne({ _id: id, user: uid });
    if (!data) throw new NotFoundException("Not found");
    return this.orderModel.findByIdAndDelete(id);
  }
}
