import { Field, ObjectType, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class LeaderBoard {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  plan: string;

  @Field()
  @IsString()
  billingCycle: string;

  @Field()
  @IsString()
  paymant: string;

  @Field()
  @IsString()
  coupon: string;

  @Field()
  @IsString()
  extraInfo: string;
}
