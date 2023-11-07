import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model, isValidObjectId } from "mongoose";
import { LoginAdminDto } from "./dto/login-admin.dto";
import * as bcrypt from "bcrypt";
import { env } from "process";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminRepo: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async getToken(payload: any): Promise<Object> {
    const token = await this.jwtService.sign(payload);

    return { access_token: token };
  }
  async add(registerAdminDto: RegisterAdminDto) {
    const { email, phone_number } = registerAdminDto;
    const mail = await this.AdminRepo.findOne({ email });
    const phone = await this.AdminRepo.findOne({ phone_number });
    if (mail) throw new BadRequestException("Email already exists");
    if (phone) throw new BadRequestException("Phone number already exists");

    let hashedPassword = await bcrypt.hash(registerAdminDto.password, 7);

    if (registerAdminDto.key && registerAdminDto.key == env.TOP_SECRET) {
      const data = await this.AdminRepo.create({
        ...registerAdminDto,
        password: hashedPassword,
        is_owner: true,
      });

      const payload = {
        id: data._id,
        is_owner: data.is_owner,
      };

      return await this.getToken(payload);
    } else {
      const data = await this.AdminRepo.create({
        ...registerAdminDto,
        password: hashedPassword,
      });

      const payload = {
        id: data._id,
        is_owner: data.is_owner,
      };

      return this.getToken(payload);
    }
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const mail = await this.AdminRepo.findOne({ email: email });
    if (!mail) throw new BadRequestException("Invalid email or password");
    const isMatch = await bcrypt.compare(password, mail.password);
    if (!isMatch) throw new BadRequestException("Invalid email or password");

    const payload = {
      id: mail._id,
      is_owner: mail.is_owner,
    };

    return this.getToken(payload);
  }

  findAll() {
    return this.AdminRepo.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException("User Not Found");
    const user = await this.AdminRepo.findById(id);
    if (!user) throw new NotFoundException("User Not Found");
    return user;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    if (!isValidObjectId(id)) throw new NotFoundException("User Not Found");

    const user = await this.AdminRepo.findById(id);
    if (!user) throw new NotFoundException("User Not Found");

    return this.AdminRepo.findByIdAndUpdate(id, updateAdminDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException("User Not Found");

    const user = await this.AdminRepo.findById(id);
    if (!user) throw new NotFoundException("User Not Found");

    return this.AdminRepo.findByIdAndDelete(id);
  }
}
