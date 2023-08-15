import { Field, InputType, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/modules/user/user.model';
import { Group } from '../../../object_types/group';

@InputType()
export class UpdateTeamDto {
  @IsNumber()
  @Field(() => ID)
  id: number;

  @Field()
  @IsString()
  @IsOptional()
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
