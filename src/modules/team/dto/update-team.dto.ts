import { Field, InputType, ID } from '@nestjs/graphql';
import { Group, User } from '@prisma/client';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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
