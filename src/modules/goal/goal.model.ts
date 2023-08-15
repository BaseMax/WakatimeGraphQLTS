import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

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

  @Field()
  unitAmount: string;

  @Field()
  @IsString()
  perEachUnit: string;

  @Field()
  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
