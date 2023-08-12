import { Query, Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { GqlUser } from './user.decorator';
import { UpdateProfileInput } from './dto/updateProfile.dto';

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

  @Query(() => User)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
    @GqlUser() user: any,
  ) {
    return await this.userService.updateProfile(input, user);
  }

  @Mutation(() => String)
  async createAPIKey(@GqlUser() user: any) {
    return await this.userService.createAPIKey(user);
  }

  @Mutation(() => User)
  async deleteAPIKey(@Args('apiKEYID') apiKEYID: string) {
    return await this.userService.deleteAPIKey(apiKEYID);
  }

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

  // @Mutation(() => String)
  // async uploadFile(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   { createReadStream, filename }: FileUpload,
  // ): Promise<string> {
  //   const stream = createReadStream();
  //   return this.userService.uploadUserProfile(stream, filename);
  // }
}
