import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { GqlUser } from './user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => User)
  async getAPIKey(@GqlUser() user: any) {
    return await this.userService.getAPIKey(user);
  }

  @Query(() => User)
  async getUserProfile(@GqlUser() user: any) {
    return await this.userService.getUserProfile(user);
  }

  @Query(() => User)
  async getUserCodingActivity(
    @Args('startDate') startDate: Date,
    @Args('startDate') endDate: Date,
    @GqlUser() user: any,
  ) {
    return await this.userService.getUserCodeActivity(startDate, endDate, user);
  }
}
