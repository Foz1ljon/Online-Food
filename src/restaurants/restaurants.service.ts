import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Restaurant } from "./schemas/restaurant.schema";
import { Model, isValidObjectId } from "mongoose";
import { FilesService } from "../files/files.service";
import { AddLocationDto } from "./dto/add-location.dto";
import { Territory } from "../territory/schemas/territory.schema";
import { Location } from "./schemas/location.schema";
import { UpdateLocationDto } from "./dto/update-location.dto";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
    @InjectModel(Territory.name)
    private readonly territoryModel: Model<Territory>,
    private readonly fileService: FilesService,
  ) {}

  /* _____________________ Add Restaurant ____________________________ */
  async create(createRestaurantDto: CreateRestaurantDto, image: any) {
    if (!image) throw new BadRequestException("Image is required");
    let photoName = await this.fileService.createFile(image);
    const data = await this.restaurantModel.create({
      ...createRestaurantDto,
      photo: photoName,
    });

    console.log(data);

    return data;
  }

  async findAll() {
    return this.restaurantModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const result = await this.restaurantModel.findById(id);
    if (!result) throw new NotFoundException("Restaurant not found");
    return result;
  }

  /* ______________ UPdate data ____________________________ */
  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const result = await this.restaurantModel.findById(id);
    if (!result) throw new NotFoundException("Restaurant not found");

    return this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto);
  }

  /* ________________________ Update photo __________________________ */

  async updateRestaurantPhoto(id: string, image: any) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const result = await this.restaurantModel.findById(id);
    if (!result) throw new NotFoundException("Restaurant not found");

    if (!image) throw new BadRequestException("Image is required");

    await this.fileService.deleteFile(result.photo);
    let photoName = await this.fileService.createFile(image);

    const data = await this.restaurantModel.findByIdAndUpdate(id, {
      photo: photoName,
    });

    return data;
  }

  /*  ___________________ Remove Restaurant ____________________ */
  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const result = await this.restaurantModel.findById(id);
    if (!result) throw new NotFoundException("Restaurant not found");

    return this.restaurantModel.findByIdAndDelete(id);
  }

  /* ________________________________ Add Location ______________________________ */
  async addLocation(id: string, addLocationDto: AddLocationDto) {
    if (!isValidObjectId(id) || !isValidObjectId(addLocationDto.territory)) {
      throw new BadRequestException("Invalid Territory or Restaurant id");
    }
    const result = await this.restaurantModel.findById(id);
    const territory = await this.territoryModel.findById(
      addLocationDto.territory,
    );

    if (!result) {
      throw new NotFoundException("Restaurant not found");
    }
    if (!territory) {
      throw new NotFoundException("Territory not found");
    }

    const location = await this.locationModel.create(addLocationDto);

    result.locations.push(location);
    await result.save();

    return result;
  }

  /* ____________________ edit Location by id __________________________ */
  async editLocation(id: string, updateLocationDto: UpdateLocationDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.locationModel.findById(id);
    if (!result) throw new NotFoundException("Location not found");
    return this.locationModel
      .findByIdAndUpdate(id, updateLocationDto)
      .populate("territory")
  }

  /* _________________ findAll location by restaurant id _____________ */

  async findallLocation(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException("Invalid id");
    const result = await this.restaurantModel.findById(id).populate("locations");
    if (!result) throw new NotFoundException("Restaurant not found");
    return result.locations;
  }

  /* ________________ find By id Location _________________________ */

  async findById(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.locationModel.findById(id);
    if (!result) throw new NotFoundException("Not found");
    return result;
  }
  /* __________ remove location by id _________________________ */
  async removeLocation(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");
    const result = await this.locationModel.findById(id);
    if (!result) throw new NotFoundException("Not found");
    return this.locationModel.findByIdAndDelete(id);
  }
}
