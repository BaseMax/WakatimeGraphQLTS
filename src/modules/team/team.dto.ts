import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Group } from '@prisma/client';
import { User } from '@prisma/client';

@ObjectType('team')
export class Team {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @Type(() => Object)
  @IsOptional()
  group: Group;

  @Field()
  @Type(() => Object)
  @IsOptional()
  user: User;
}
