import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ProjectModule } from './modules/project/project.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { EditorModule } from './modules/editor/editor.module';
import { TeamModule } from './modules/team/team.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { GoalModule } from './modules/goal/goal.module';
import { LeaderboardsModule } from './modules/leaderboards/leaderboards.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AuthModule,
    UserModule,
    NotificationModule,
    AnalyticsModule,
    ProjectModule,
    PrismaModule,
    EditorModule,
    TeamModule,
    InvoiceModule,
    GoalModule,
    LeaderboardsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './uploads', // Specify the destination folder
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
