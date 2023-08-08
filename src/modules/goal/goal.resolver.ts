import { Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';

@Resolver()
export class GoalResolver {
  constructor(private userService : UserService){}


}
