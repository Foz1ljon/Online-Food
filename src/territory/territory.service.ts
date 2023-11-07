import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AddTerritoryDto } from "./dto/add-territory.dto";
import { UpdateTerritoryDto } from "./dto/update-territory.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Territory } from "./schemas/territory.schema";
import { Model, isValidObjectId } from "mongoose";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class TerritoryService {
  constructor(
    @InjectModel(Territory.name) private territoryModel: Model<Territory>,
    @InjectModel(Region.name) private regionModel: Model<Region>,
  ) {}
  async create(addTerritoryDto: AddTerritoryDto) {
    const { region, name } = addTerritoryDto;
    if (!isValidObjectId(region))
      throw new BadRequestException("Invalid region id");

    const regions = await this.regionModel.findById(region);
    if (!regions) throw new NotFoundException("Region not found");

    const data = await this.territoryModel.create(addTerritoryDto);

    return data.populate("region");
  }

  findAll() {
    return this.territoryModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.territoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found territory");
    return data.populate("region");
  }

  async update(id: string, updateTerritoryDto: UpdateTerritoryDto) {
    if (updateTerritoryDto.region) {
      if (!isValidObjectId(updateTerritoryDto.region))
        throw new BadRequestException("Invalid id");
      const region = await this.regionModel.findById(updateTerritoryDto.region);
      if (!region) throw new NotFoundException("Region not found");
    }

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.territoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found territory");
    return this.territoryModel.findByIdAndUpdate(id, updateTerritoryDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const data = await this.territoryModel.findById(id);
    if (!data) throw new NotFoundException("Not found territory");
    return this.territoryModel.findByIdAndDelete(id);
  }
}
