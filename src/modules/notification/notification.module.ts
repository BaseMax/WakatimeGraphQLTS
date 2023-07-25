import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.resolver';

@Module({
  providers: [NotificationService, Notification]
})
export class NotificationModule {}
