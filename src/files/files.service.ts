import {
  Logger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs";

@Injectable()
export class FilesService {
  constructor(private readonly logger: Logger) {}
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + path.extname(file.originalname);

      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      this.logger.error("Writting error:", error.stack, FilesService.name);
      throw new InternalServerErrorException("Error writing file");
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const filePath = path.join(__dirname, "..", "static", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        throw new NotFoundException("File not found");
      }
    } catch (error) {
      this.logger.error("deleting error:", error.stack, FilesService.name);
      throw new InternalServerErrorException("Error deleting file");
    }
  }
}
