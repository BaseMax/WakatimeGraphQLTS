import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.resolver';

@Module({
  providers: [UserService, User]
})
export class UserModule {}
