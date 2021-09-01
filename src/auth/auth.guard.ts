import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtSrv: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const headers: any = request.headers;

    if (!headers.authorization) {
      return false;
    }

    const token = headers.authorization.split(' ').pop();

    try {
      (request as any).user = this.jwtSrv.verify(token);
    } catch {
      return false;
    }

    return true;
  }
}
