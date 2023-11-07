import { Module } from "@nestjs/common";
import { UserlocationService } from "./userlocation.service";
import { UserlocationController } from "./userlocation.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Userlocation,
  UserlocationSchema,
} from "./schemas/userlocation.schema";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userlocation.name, schema: UserlocationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
  ],
  controllers: [UserlocationController],
  providers: [UserlocationService],
})
export class UserlocationModule {}
