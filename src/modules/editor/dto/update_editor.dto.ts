import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateEditroInput {
  @IsNumber()
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  @IsOptional()
  name: string;

  @IsNumber()
  @Field()
  @IsNumber()
  projectID: number;
}
