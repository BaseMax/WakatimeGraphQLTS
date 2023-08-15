import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Group } from '../../object_types/group';
import { User } from '../user/user.model';

@ObjectType('team')
export class Team {
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field((type) => Group)
  @Type(() => Object)
  @IsOptional()
  group: Group;

  @Field((type) => User)
  @Type(() => Object)
  @IsOptional()
  user: User;
}
