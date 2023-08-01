import { Module } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { LeaderboardsResolver } from './leaderboards.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [LeaderboardsService, LeaderboardsResolver],
  imports: [PrismaModule, UserModule ],
})
export class LeaderboardsModule {}
