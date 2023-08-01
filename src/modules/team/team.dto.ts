import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType('team')
export class Team {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;
}
