import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

@InputType()
export class UpdateGoalDto {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  amount: number;

  @Field()
  @IsString()
  unitAmount: string;

  @Field()
  @IsString()
  perEachUnit: string;

  @Field()
  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
