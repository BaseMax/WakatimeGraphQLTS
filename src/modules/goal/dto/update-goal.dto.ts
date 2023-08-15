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

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  amount: string;

  @IsString()
  @IsPositive()
  unitAmount: string;

  @IsOptional()
  @IsString()
  perEachUnit: string;

  @IsBoolean()
  @IsOptional()
  ignoreDaysWithNoCode: boolean;
}
