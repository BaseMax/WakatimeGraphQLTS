import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import {GqlUser} from './user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService : UserService){}
  @Query(() => User)
  async getAPIKey(@GqlUser() user : any) {
    return this.userService.getAPIKey(user)
  }
}
