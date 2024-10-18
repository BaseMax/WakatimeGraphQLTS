import { InputType, Field, ID } from '@nestjs/graphql';

@InputType('input')
export class RegistrationUserInput {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  phonenumber?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  token?: string;
}