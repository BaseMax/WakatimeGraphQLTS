import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService],
  imports: [PrismaModule, UserModule, forwardRef(() => AuthModule)],
})
export class NotificationModule {}
