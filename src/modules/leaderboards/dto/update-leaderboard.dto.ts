import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateLeaderBoardInput {
  @Field(() => ID)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Field()
  @IsOptional()
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
