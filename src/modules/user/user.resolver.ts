import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { UseInterceptors } from '@nestjs/common';
import { GqlUser } from './user.decorator';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Resolver(() => User)
export class UserResolver {

  constructor(private userService: UserService) { }

  @Query(() => User)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('getUserApiKey')  // unique cache key
  @CacheTTL(120)
  async getAPIKey(@GqlUser() user: any) {
    return this.userService.getAPIKey(user);
  }

}
