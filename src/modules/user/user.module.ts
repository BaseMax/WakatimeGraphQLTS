import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UserService, UserResolver],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
