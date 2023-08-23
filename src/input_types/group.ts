import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Dashboard } from '@prisma/client';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Team } from 'src/modules/team/team.dto';
import { User } from '../modules/user/user.model';

@InputType('group')
export class GroupInput {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field(() => [User])
  admins: User[];

  @Field(() => [User])
  billingManagers: User[];

  @Field(() => [User])
  devs: User[];

  @Field(() => [User])
  inviteOnly: User[];

  @Field(() => [User])
  managers: User[];

  @Field(() => [User])
  owners: User[];
}
