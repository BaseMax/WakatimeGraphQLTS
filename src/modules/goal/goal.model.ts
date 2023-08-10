import { ObjectType, Field, ID } from '@nestjs/graphql';
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

@ObjectType('goal')
export class Goal {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  amount: string;

  @Field(() => UnitAmount)
  @IsEnum(UnitAmount)
  unitAmount: UnitAmount;

  @Field()
  @IsString()
  perEachUnit: PerEachUnit;

  @Field()
  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
