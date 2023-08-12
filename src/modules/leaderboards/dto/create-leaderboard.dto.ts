import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateLeaderBoardInput {
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
