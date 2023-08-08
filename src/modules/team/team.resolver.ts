import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Team } from './team.dto';
import { TeamService } from './team.service';
import { GqlUser } from '../user/user.decorator';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @Query(() => [Team])
  async getTeams() {
    return await this.teamService.getTeams();
  }

  @Query(() => Team)
  async getTeam(@Args('input') teamID: number) {
    return await this.teamService.getTeamById(teamID);
  }

  @Query(() => [Team])
  async getUsersTeams(@GqlUser() user: any) {
    return await this.teamService.getUsersTeams(user);
  }

  @Mutation()
  async createTeam(@Args('input') input: CreateTeamDto, @GqlUser() user: any) {
    return await this.teamService.createTeam(user, input);
  }

  @Mutation(() => Team)
  async updateTeam(@Args('input') input: UpdateTeamDto) {
    return await this.teamService.updateTeam(input);
  }

  @Mutation(() => Team)
  async addMemberToTeam(
    @Args('teamID', ParseIntPipe) teamID: number,
    @Args('memberID', ParseIntPipe) memberID: number,
  ) {
    return await this.teamService.addTeamMember(teamID, memberID);
  }

  @Mutation()
  async addToGroup(
    @Args('groupID', ParseIntPipe) groupID: number,
    @Args('memberID', ParseIntPipe) memberID: number,
    @Args('groupStatus', ParseIntPipe) groupStatus: string,
  ) {
    return await this.teamService.addToGroup(groupID, memberID, groupStatus);
  }
}
