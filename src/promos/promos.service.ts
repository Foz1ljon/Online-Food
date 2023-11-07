import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { UpdatePromoDto } from "./dto/update-promo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Promo } from "./schemas/promo.schema";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class PromosService {
  constructor(@InjectModel(Promo.name) private promoModel: Model<Promo>) {}
  async create(createPromoDto: CreatePromoDto) {
    const { name } = createPromoDto;
    const find = await this.promoModel.findOne({ name });
    if (find) throw new BadRequestException("Name already exists");
    return this.promoModel.create(createPromoDto);
  }

  findAll() {
    return this.promoModel.find();
  }

  async findOne(name: string) {
    const obj = await this.promoModel.findOne({ name });
    if (!obj) throw new NotFoundException("Promo not found");
    return obj;
  }

  async update(id: string, updatePromoDto: UpdatePromoDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const obj = await this.promoModel.findById(id);
    if (!obj) throw new NotFoundException("Promo not found");
    return this.promoModel.findByIdAndUpdate(id, updatePromoDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const obj = await this.promoModel.findById(id);
    if (!obj) throw new NotFoundException("Promo not found");
    return this.promoModel.findByIdAndDelete(id);
  }
}
