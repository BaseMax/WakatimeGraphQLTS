import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { UnitAmount } from 'src/utils/enums';

@InputType()
export class CreateGoalDto {
  @IsString()
  name: string;

  @IsString()
  amount: string;

  @IsString()
  unitAmount: string;

  @IsString()
  perEachUnit: string;

  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
