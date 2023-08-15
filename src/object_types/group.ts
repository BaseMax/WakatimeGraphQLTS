import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID } from 'class-validator';

@ObjectType('group')
export class Group {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;
}
