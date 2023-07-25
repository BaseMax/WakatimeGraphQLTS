import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class RegistrationUserInput {
  @IsString()
  @Field()
  @Length(3, 40)
  name: string;

  @IsString()
  @Field()
  @Length(3, 40)
  username: string;

  @IsString()
  @Field()
  @Length(6, 100)
  password: string;

  @IsString()
  @Field()
  phonenumber: string;

  @IsOptional()
  @IsString()
  @Field()
  bio: string;
}
