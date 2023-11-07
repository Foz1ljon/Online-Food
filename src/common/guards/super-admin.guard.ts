import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../../admin/schemas/admin.schema";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new UnauthorizedException("User unauthorized");

      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== "Bearer" || !token)
        throw new UnauthorizedException("User unauthorized");

      try {
        const user: Partial<Admin> = await this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY2,
        });

        if (!user) throw new UnauthorizedException("User unauthorized");

        if (!user.is_owner) throw new UnauthorizedException("Access denied");

        return true;
      } catch (error) {
        throw new UnauthorizedException("User unauthorized");
      }
    } catch (error) {
      throw new UnauthorizedException("User unauthorized");
    }
  }
}
