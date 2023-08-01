import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalResolver } from './goal.resolver';

@Module({
  providers: [GoalService, GoalResolver]
})
export class GoalModule {}
