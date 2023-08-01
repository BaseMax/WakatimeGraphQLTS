import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Team } from './team.dto';
import { TeamService } from './team.service';
import { GqlUser } from '../user/user.decorator';
import { CreateTeamDto } from './dto';

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
}
