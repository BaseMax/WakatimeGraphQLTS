import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalResolver } from './goal.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { CreateGoalDto, UpdateGoalDto } from './dto';

@Module({
  providers: [GoalService, GoalResolver, CreateGoalDto, UpdateGoalDto],
  exports: [GoalService],
  imports: [PrismaModule, UserModule],
})
export class GoalModule {}
