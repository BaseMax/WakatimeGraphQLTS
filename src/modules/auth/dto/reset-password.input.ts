import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  phonenumber: string;

  @IsString()
  @Field()
  oldPassword: string;

  @IsString()
  @Field()
  newPassword: string;

  @IsString()
  @Field()
  passwordConfirm: string;
}
