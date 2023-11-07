import { Logger, Module } from "@nestjs/common";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService,Logger],
  exports: [FilesService ],
})
export class FilesModule {}
