import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsNumber()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  name: string;

  @IsNumber()
  @Field()
  totalTime: number;
}