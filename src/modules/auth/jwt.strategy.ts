import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'my project will be a clone for wakatime ! endless possiblityes',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub);
    console.log('do you even get called ?')
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
