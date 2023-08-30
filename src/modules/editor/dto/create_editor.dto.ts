import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEditroInput {
  @IsString()
  @Field()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Field()
  @IsNotEmpty()
  userId: number;
}
