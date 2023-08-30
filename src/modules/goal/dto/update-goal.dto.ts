import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator';

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

  @Field()
  @IsString()
  @IsPositive()
  unitAmount: string;

  @Field()
  @IsOptional()
  @IsString()
  perEachUnit: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  ignoreDaysWithNoCode: boolean;
}
