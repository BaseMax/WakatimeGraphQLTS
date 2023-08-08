import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGoalDto {
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
  ignoreDaysWithNoCode : boolean;
}
