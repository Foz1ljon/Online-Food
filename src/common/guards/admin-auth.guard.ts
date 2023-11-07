import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../../admin/schemas/admin.schema";
import { env } from "process";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const auth = req.headers.authorization;
      if (!auth) throw new UnauthorizedException("Unauthorized access token");

      const key = auth.split(" ")[0],
        token = auth.split(" ")[1];

      if (key !== "Bearer" || !token)
        throw new UnauthorizedException("Unauthorized access token");

      try {
        const user: Partial<Admin> = await this.jwtService.verify(token, {
          secret: env.ACCESS_TOKEN_KEY2,
        });

        return true;
      } catch (error) {
        throw new UnauthorizedException("Unauthorized access token");
      }
    } catch (error) {
      throw new UnauthorizedException("Unauthorized access token");
    }
  }
}
