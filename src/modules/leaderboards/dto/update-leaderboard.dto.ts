import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateLeaderBoardInput {
  @IsNumber()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  @IsOptional()
  plan: string;

  @IsString()
  @Field()
  @IsOptional()
  billingCycle: string;

  @IsString()
  @Field()
  @IsOptional()
  paymant: string;

  @IsString()
  @Field()
  @IsOptional()
  coupon: string;

  @IsString()
  @Field()
  @IsOptional()
  extraInfo: string;
}
