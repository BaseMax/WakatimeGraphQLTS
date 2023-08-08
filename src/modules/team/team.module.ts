import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [TeamService, TeamResolver],
  exports: [TeamService],
  imports: [PrismaModule, UserModule],
})
export class TeamModule {}
