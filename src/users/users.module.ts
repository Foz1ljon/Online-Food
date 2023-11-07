import { Module, Logger } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { FilesModule } from "../files/files.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    JwtModule.register({}),
    FilesModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
