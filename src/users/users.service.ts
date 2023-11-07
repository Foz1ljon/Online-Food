import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model, isValidObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import * as uuid from "uuid";
import { FilesService } from "../files/files.service";
import { env } from "process";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly filesService: FilesService,
    private readonly mailService: MailService,
  ) {}

  /* _______________________________ Generate Token  __________________________________ */

  async getTokens(user: any) {
    const jwtPlayload = {
      id: user._id,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPlayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /* _______________________________ Update Refresh Token  __________________________________ */

  async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hashed_refreshToken = await bcrypt.hash(refreshToken, 7);

    await this.UserModel.findByIdAndUpdate(id, {
      hashed_refresh_token: hashed_refreshToken,
    });
  }

  /* ________________________________ Royxatdan o`tish _________________________________________ */
  async signup(registerUserDto: RegisterUserDto, res: Response) {
    const { email, phone_number } = registerUserDto;

    const mail = await this.UserModel.findOne({ email });
    const phone = await this.UserModel.findOne({ phone_number });

    if (mail) throw new BadRequestException("Email already in exists");
    if (phone) throw new BadRequestException("Phone number already in exists");

    const hashedpassword = await bcrypt.hash(registerUserDto.password, 7);
    const newUser = await this.UserModel.create({
      ...registerUserDto,
      password: hashedpassword,
      activation_link: uuid.v4(),
    });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendUserConfirmation(newUser);
    } catch (error) {
      console.log(error);
    }
    return tokens;
  }

  /* _____________________  Login qismi  ________________________________   */
  async signin(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw new BadRequestException("Invalid Email or Password");

    const passwordMatches = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException("Invalid Email or Password");

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  /* ______________________________ LogOut qismi __________________________ */
  async logout(refreshToken: string, res: Response) {
    const UserData = await this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    });
    if (!UserData) throw new ForbiddenException("User not found");
    await this.UserModel.findByIdAndUpdate(UserData.id, {
      $set: { hashed_refresh_token: null },
    });

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out Successfully",
    };
    return response;
  }

  /* _____________________ Tokenni yangilash qismi _______________________ */
  async refreshToken(refreshToken: string, res: Response) {
    const uid = this.jwtService.decode(refreshToken)["id"];

    const user = await this.UserModel.findById(uid);
    if (!user || !user.hashed_refresh_token)
      throw new NotFoundException("User not found");
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) throw new ForbiddenException("Forbidden");

    const tokens = await this.getTokens(user);
    const Hashedtoken = await bcrypt.hash(tokens.refresh_token, 7);
    const UpdatedUser = await this.UserModel.findByIdAndUpdate(uid, {
      $set: { hashed_refresh_token: Hashedtoken },
    });
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Successfully refreshed token",
      tokens,
    };

    return response;
  }

  /* ______________________ User activate _________________________________ */
  async activate(link: string) {
    if (!link) throw new BadRequestException("Activation link not found");
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { activation_link: link, is_active: false },
      { is_active: true },
    );

    if (!updatedUser) throw new BadRequestException("User already activated");

    const response = {
      message: "User activated successfully",
    };
    return response;
  }

  /* _________________________ Barcha Userlarni ko`rish ____________________________ */
  findAll() {
    return this.UserModel.find();
  }

  /* _________________________ Userlarni id bo`yicha olish ________________________ */
  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Invalid id");

    const user = await this.UserModel.findById(id);

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  /* Photo yuklash */
  async updatePhoto(refreshToken: string, image: any) {
    if (!image) throw new BadRequestException("Image is required");
    const uid = this.jwtService.decode(refreshToken)["id"];

    const user = await this.UserModel.findById(uid);
    if (!user.photo) {
      let photoname = await this.filesService.createFile(image);
      return this.UserModel.findByIdAndUpdate(
        uid,
        { photo: photoname },
        { new: true },
      );
    } else {
      await this.filesService.deleteFile(user.photo);
      const photoName = await this.filesService.createFile(image);
      return this.UserModel.findByIdAndUpdate(
        uid,
        { photo: photoName },
        { new: true },
      );
    }
  }

  /* __________________________ Ma`lumotlarni yangilash qismi __________________________ */
  async update(refreshToken: string, updateUserDto: UpdateUserDto) {
    const id = this.jwtService.decode(refreshToken)["id"];
    if (updateUserDto.phone_number) {
      const find = await this.UserModel.findOne({
        phone_number: updateUserDto.phone_number,
      });
      if (find) throw new BadRequestException("Phone Number already exists");
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
    }
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  /* _____________________________  Delete account ____________________________________ */
  async remove(refreshToken: string, res: Response) {
    const user = this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    });
    if (!user) throw new ForbiddenException("Access denied");
    const id = this.jwtService.decode(refreshToken)["id"];
    res.clearCookie("refresh_token");
    return this.UserModel.findByIdAndDelete(id);
  }
}
