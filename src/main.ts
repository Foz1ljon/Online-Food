import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "process";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { LoggerFactory } from "./logger/loggerFactory";

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory("OnlineFoodOrdering"),
    });

    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    const config = new DocumentBuilder()
      .setTitle("Online Food Order Management")
      .setDescription("NestJS, MONGODB REST API Documentation")
      .setVersion("1.0")
      .addTag("")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(env.PORT, () => {
      console.log("Running app " + env.PORT);
    });
  } catch (error) {
    error.message;
  }
}
start();
