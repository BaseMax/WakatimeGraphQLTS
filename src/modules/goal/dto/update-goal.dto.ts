import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
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
export class UpdateGoalDto {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  @IsOptional()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  amount: string;

  @Field(() => UnitAmount)
  @IsEnum(UnitAmount)
  @IsOptional()
  unitAmount: UnitAmount;

  @Field(() => PerEachUnit)
  @IsEnum(PerEachUnit)
  @IsOptional()
  perEachUnit: PerEachUnit;

  @Field()
  @IsBoolean()
  @IsOptional()
  ignoreDaysWithNoCode: boolean;
}
