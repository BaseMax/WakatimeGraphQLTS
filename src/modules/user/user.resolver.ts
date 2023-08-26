import { Query, Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { GqlUser } from './user.decorator';
import { UpdateProfileInput } from './dto/updateProfile.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Activity } from '../../models/activity.modle';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Query(() => User)
  async getAPIKey(@GqlUser() user: any) {
    return await this.userService.getAPIKey(user);
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async getUserProfile(@GqlUser() user: any) {
    return await this.userService.getUserProfile(user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Activity])
  async getUserCodingActivity(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @GqlUser() user: any,
  ) {
    return await this.userService.getUserCodeActivity(startDate, endDate, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
    @GqlUser() user: any,
  ) {
    return await this.userService.updateProfile(input, user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async createAPIKey(@GqlUser() user: any) {
    return await this.userService.createAPIKey(user);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async deleteAPIKey(@Args('apiKEYID') apiKEYID: string) {
    return await this.userService.deleteAPIKey(apiKEYID);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async trackCodingActivity(
    @Args('projectID') projectID: number,
    @Args('language') language: string,
    @Args('file') file: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
    @GqlUser() user: any, 
  ) {
    return await this.userService.trackCodingActivity(
      projectID,
      language,
      file,
      startTime,
      endTime,
      user,
    );
  }
}
