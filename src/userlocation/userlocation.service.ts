import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserlocationDto } from "./dto/create-userlocation.dto";
import { UpdateUserlocationDto } from "./dto/update-userlocation.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Userlocation } from "./schemas/userlocation.schema";
import { Model, isValidObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class UserlocationService {
  constructor(
    @InjectModel(Userlocation.name) private userlocModel: Model<Userlocation>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userLocation: CreateUserlocationDto, refreshToken: string) {
    const id = await this.jwtService.decode(refreshToken)["id"];
    return this.userlocModel.create({ ...userLocation, user: id });
  }

  async findAll(refreshToken: string) {
    const id = await this.jwtService.decode(refreshToken)["id"];
    return this.userlocModel.find({ user: id }).populate("user");
  }

  async findOne(id: string, refreshToken: string) {
    const uid = await this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const user = await this.userlocModel.findOne({ _id: id, user: uid });
    if (!user) throw new NotFoundException("Location not found");
    return user.populate("user");
  }

  async update(
    id: string,
    Userloc: UpdateUserlocationDto,
    refreshToken: string,
  ) {
    const uid = await this.jwtService.decode(refreshToken)["id"];

    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const user = await this.userlocModel.findOne({ _id: id, user: uid });
    if (!user) throw new NotFoundException("Location not found");

    return this.userlocModel.findByIdAndUpdate(id, Userloc).populate("user");
  }

  async remove(id: string, refreshToken: string) {
    const uid = await this.jwtService.decode(refreshToken)["id"];
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid Id");
    const user = await this.userlocModel.findOne({ _id: id, user: uid });
    if (!user) throw new NotFoundException("Location not found");

    return this.userlocModel.findByIdAndDelete(id);
  }
}
