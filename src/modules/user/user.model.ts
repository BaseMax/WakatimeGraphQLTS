import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Notification } from '../notification/notification.model';
import { Editor } from '../editor/editor.model';
import { Team } from '../team/team.dto';
import { Group } from '../../object_types/group';
import { GroupInput } from '../../input_types/index';

@ObjectType('user')
@InputType('UserInput')
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  userAtId: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  bio: string;

  @Field()
  @IsString()
  notificationStatus: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUUID()
  APIKEY: string;

  @Field(() => [Notification])
  notifications: Notification[];

  @Field(() => [Team])
  teams: Team[];

  @Field(() => [Group], { nullable: true })
  adminGroups: Group[];

  @Field(() => [Group], { nullable: true })
  billingManagerGroups: Group[];

  @Field(() => [Group], { nullable: true })
  devGroups: Group[];

  @Field(() => [Group], { nullable: true })
  inviteOnlyGroups: Group[];

  @Field(() => [Group], { nullable: true })
  managersGroups: Group[];

  @Field(() => [Group], { nullable: true })
  ownersGroups: Group[];

  @Field(() => [String])
  notificationsType: String[];

  @Field(() => [String])
  notificationDisturbHour: String[];

  // @Field(() => String, { nullable: true })
  // notificationStatus: String;

  @Field(() => [Editor])
  editors: Editor[];
}
