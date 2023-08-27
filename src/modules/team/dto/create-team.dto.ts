import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTeamDto {
  @Field()
  @IsString()
  name: string;
}
