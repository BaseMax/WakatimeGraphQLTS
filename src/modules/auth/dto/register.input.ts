import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class RegistrationUserInput {
  @IsString()
  @Field()
  @Length(3, 40)
  username: string;

  @IsString()
  @Field()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsString()
  @Field()
  bio: string;

  @IsOptional()
  @IsString()
  @Field()
  email: string;
}
