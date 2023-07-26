import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Notification } from '../notification/notification.model';

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
}
