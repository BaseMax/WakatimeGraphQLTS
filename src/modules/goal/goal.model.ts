import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Project } from '../project/project.model';

@ObjectType('goal')
export class Goal {
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
  perEachUnit: number;

  @Field()
  @IsBoolean()
  ignoreDaysWithNoCode: boolean;
}
