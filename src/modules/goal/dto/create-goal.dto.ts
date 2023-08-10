import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
enum UnitAmount {
  secs = 'secs',
  hrs = 'hrs',
  min = 'min',
}

enum PerEachUnit {
  day = 'day',
  week = 'week',
  month = 'month',
  alltime = 'alltime',
}

@InputType()
export class CreateGoalDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  amount: string;

  @Field(() => UnitAmount)
  @IsEnum(UnitAmount)
  unitAmount: UnitAmount;

  @Field(() => PerEachUnit)
  @IsEnum(PerEachUnit)
  perEachUnit: PerEachUnit;

  @Field()
  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
