import { Module } from '@nestjs/common';
import { Analytics } from './analytics.resolver';
import { AnalyticsService } from './analytics.service';

@Module({
  providers: [Analytics, AnalyticsService]
})
export class AnalyticsModule {}
