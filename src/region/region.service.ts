import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AddRegionDto } from "./dto/add-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./schemas/region.schema";
import { Model, isValidObjectId } from "mongoose";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<Region>,
  ) {}
  async create(addRegionDto: AddRegionDto) {
    const { name } = addRegionDto;
    const reg = await this.regionModel.findOne({ name });
    if (reg) throw new BadRequestException("Region already exists");

    return this.regionModel.create(addRegionDto);
  }

  findAll() {
    return this.regionModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.regionModel.findById(id);
    if (!data) throw new NotFoundException("Not found");

    return data;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.regionModel.findById(id);
    if (!data) throw new NotFoundException("Not found");
    return this.regionModel.findByIdAndUpdate(id, updateRegionDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.regionModel.findById(id);
    if (!data) throw new NotFoundException("Not found");
    return this.regionModel.findByIdAndDelete(id);
  }
}
