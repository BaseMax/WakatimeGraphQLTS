import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID, IsDate } from 'class-validator';

@ObjectType('activity')
@InputType('ActivityInput')
export class Activity {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  language: string;

  @Field()
  @IsDate()
  startDate: string;

  @Field()
  @IsDate()
  endDate: string;

  @Field()
  @IsString()
  file: string;
}
