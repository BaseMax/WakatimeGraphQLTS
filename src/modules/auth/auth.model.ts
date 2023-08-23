import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType('AuthModel')
export class AuthModel {
  @IsNumber()
  @Field({ nullable: true })
  id: number;

  @IsString()
  @Field({ nullable: true })
  username: string;

  @IsString()
  @Field({ nullable: true })
  userAtId: string;

  @IsString()
  @Field({ nullable: true })
  bio: string;

  @IsString()
  @Field({ nullable: true })
  notificationStatus: string;

  @IsString()
  @Field({ nullable: true })
  token: string;

  @IsString()
  @Field({ nullable: true })
  avatar: string;
}
