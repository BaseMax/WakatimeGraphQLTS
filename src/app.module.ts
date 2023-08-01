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
import { TeamModule } from './modules/team/team.module';
import { InvoiceModule } from './invoice/invoice.module';
import { GoalModule } from './modules/goal/goal.module';
import { LeaderboardsModule } from './modules/leaderboards/leaderboards.module';

@Module({
  imports: [AuthModule, UserModule, NotificationModule, AnalyticsModule, ProjectModule, PrismaModule, EditorModule, TeamModule, InvoiceModule, GoalModule, LeaderboardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
