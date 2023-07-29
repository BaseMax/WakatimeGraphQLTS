import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { EditorModule } from './modules/editor/editor.module';

@Module({
  imports: [AuthModule, UserModule, NotificationModule, AnalyticsModule, ProjectModule, PrismaModule, EditorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
