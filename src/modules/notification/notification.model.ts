import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType('notification')
export class Notification {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  status: string;

  @Field(() => User)
  user: User;

  @Field(() => ID)
  userId: number;
}
