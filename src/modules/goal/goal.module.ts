import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalResolver } from './goal.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [GoalService, GoalResolver],
  exports: [GoalService],
  imports: [PrismaModule, UserModule],
})
export class GoalModule {}
