import { ParseIntPipe } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CreateGoalDto, UpdateGoalDto } from './dto';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { GqlUser } from '../user/user.decorator';

@Resolver(() => Goal)
export class GoalResolver {
  constructor(private goalService: GoalService) {}

  @Query(() => Goal)
  async getGoal(@Args('goalID', ParseIntPipe) goalID: number) {
    return await this.goalService.getGoal(goalID);
  }

  @Query(() => [Goal])
  async getGoals() {
    return await this.goalService.getGoals();
  }

  @Mutation(() => Goal)
  async createGoal(@Args('input') input: CreateGoalDto, @GqlUser() user: any) {
    return await this.goalService.createGoal(input, user);
  }

  @Mutation(() => Goal)
  async updateGoal(@Args('input') input: UpdateGoalDto) {
    return await this.goalService.updateGoal(input);
  }

  @Mutation(() => Goal)
  async deleteGoal(@Args('goalID', ParseIntPipe) goalID: number) {
    return await this.goalService.deleteGoal(goalID);
  }
}
