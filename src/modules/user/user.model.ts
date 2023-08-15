import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Notification } from '../notification/notification.model';
import { Editor } from '../editor/editor.model';
import { Team } from '../team/team.dto';
import { Group } from '../../object_types/group';

@ObjectType('user')
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
  status: string;

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

  @Field(() => [Group])
  adminGroups: Group[];

  @Field(() => [Group])
  billingManagerGroups: Group[];

  @Field(() => [Group])
  devGroups: Group[];

  @Field(() => [Group])
  inviteOnlyGroups: Group[];

  @Field(() => [Group])
  managersGroups: Group[];

  @Field(() => [Group])
  ownersGroups: Group[];

  @Field(() => [String])
  notificationsType: String[];

  @Field(() => [String])
  notificationDisturbHour: String[];

  @Field(() => String)
  notificationStatus: String;

  @Field(() => [Editor])
  editors: Editor[];
}
