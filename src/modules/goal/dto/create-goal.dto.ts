import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { UnitAmount } from 'src/utils/enums';

@InputType()
export class CreateGoalDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  amount: string;

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
