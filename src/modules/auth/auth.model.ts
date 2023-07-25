import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType('AuthModel')
export class AuthModel {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  userAtId: string;

  @IsString()
  @Field()
  bio: string;

  @IsString()
  @Field()
  status: string;

  @IsString()
  @Field()
  phonenumber: string;

  @IsString()
  @Field()
  token: string;

  @IsString()
  @Field()
  avatar: string;
}
