import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  email: string;
}
