import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "./schemas/admin.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { env } from "process";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    JwtModule.register({
      secret: env.ACCESS_TOKEN_KEY2,
      signOptions: {
        expiresIn: env.ACCESS_TOKEN_TIME,
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
