import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService, UserResolver],
  exports: [UserService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
})
export class UserModule {}
