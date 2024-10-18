import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString, isEmail } from 'class-validator';

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
  password: string;

  @IsString()
  @Field()
  bio: string;

  @IsEmail()
  @Field()
  email: string;

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