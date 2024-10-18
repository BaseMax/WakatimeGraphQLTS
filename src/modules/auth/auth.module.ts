import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  exports: [AuthService],
})
export class AuthModule { }
