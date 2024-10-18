import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ProjectModule } from './modules/project/project.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { EditorModule } from './modules/editor/editor.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 100,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      cache: "bounded",
      playground: true,
      sortSchema: true,
    }),
    AuthModule, UserModule, NotificationModule, AnalyticsModule, ProjectModule, PrismaModule, EditorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }