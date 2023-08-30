import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateLeaderBoardInput } from './dto/create-leaderboard.dto';
import { LeaderBoard } from './leaderboards.model';
import { LeaderboardsService } from './leaderboards.service';
import { GqlUser } from '../user/user.decorator';
import { UpdateLeaderBoardInput } from './dto/update-leaderboard.dto';

@Resolver()
export class LeaderboardsResolver {
  constructor(private leaderService: LeaderboardsService) {}

  @Query(() => LeaderBoard)
  async getLeaderBoard(
    @Args('leaderBoardID', ParseIntPipe) leaderBoardID: number,
  ) {
    return await this.leaderService.getLeaderBoard(leaderBoardID);
  }

  @Mutation(() => LeaderBoard)
  async createLeaderBoard(
    @Args('input') input: CreateLeaderBoardInput,
    @GqlUser() user: any,
  ) {
    return await this.leaderService.createLeaderBoard(input, user);
  }

  @Mutation(() => LeaderBoard)
  async updateLeaderBoard(
    @Args('input') input: UpdateLeaderBoardInput,
    @GqlUser() user: any,
  ) {
    return await this.leaderService.udpateLeaderBoard(input);
  }

  @Mutation(() => LeaderBoard)
  async joinLeaderBoard(
    @GqlUser() user: any,
    @Args('leaderBoardID', ParseIntPipe) leaderBoardID: number,
  ) {
    return await this.leaderService.joinLeaderBoard(user, leaderBoardID);
  }

  @Mutation(() => LeaderBoard)
  async leaveLeaderBoard(
    @GqlUser() user: any,
    @Args('leaderBoardID', ParseIntPipe) leaderBoardID: number,
  ) {
    return await this.leaderService.leaveLeaderBoard(user, leaderBoardID);
  }
}
