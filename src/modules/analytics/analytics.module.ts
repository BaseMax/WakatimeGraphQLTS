import { Module } from '@nestjs/common';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';

@Module({
  providers: [AnalyticsResolver, AnalyticsService],
})
export class AnalyticsModule {}
