import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService],
  imports: [PrismaModule, UserModule],
})
export class NotificationModule {}
